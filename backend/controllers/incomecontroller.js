

//calling the required schema
const Income = require('../models/incomemodel');
const Statement = require('../models/statementmodel');

var ObjectId = require('mongoose').Types.ObjectId;


module.exports = {
    addIncome: async (request, response) => {
        // current timestamp in milliseconds
        let ts = Date.now();
        let date_ob = new Date(ts);

        let d = date_ob.getDate();
        let h = date_ob.getHours();
        let m = date_ob.getMinutes();

        let KEY = d + ':' + h + ':' + m;

        const com = "Akshaya Paral";
        const reason = request.body.service;
        var bcharge = request.body.bankcharge;
        var scharge = request.body.servicecharge;
        var bscharge = request.body.bankservicecharge;
        const total = bcharge + scharge + bscharge;

        if (bscharge == null) {
            bscharge = 0;
        }
        if (bcharge == null) {
            bcharge = 0;
        }
        if (scharge == null) {
            scharge = 0;
        }

        const transaction = 'Transaction on ' + reason;


        var inc = new Income({
            company: com,
            service: reason,
            bankcharge: bcharge,
            servicecharge: scharge,
            bankservicecharge: bscharge,
            date: date_ob,
            totalincome: total,
            key: KEY
        });
        await inc.save((error, result) => {
            if (!error) {

                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    income: total,
                    date: date_ob,
                    key: KEY
                });

                statement.save((error, result) => {
                    if (!error) {
                        console.log(result);
                        console.log('Added to statement');
                    }
                    else {
                        console.log('Error adding income to statement' + JSON.stringify(error, undefined, 2));
                    }
                });

                console.log(result);
                response.status(200).json({
                    success: 1,
                    message: "Income added",
                    data: result
                });
            }
            else {
                console.log('Error adding income' + JSON.stringify(error, undefined, 2));
            }
        });
    },
    getTodayIncome: (request, response) => {
        let ts = Date.now();
        let dc = new Date(ts);
        const day = dc.getDate();
        const mon = dc.getMonth();


        Income.find((error, results) => {
            // console.log(results)
            if (!error) {
                const datas = results.filter((element) => {
                    let d = new Date(element.date);
                    const ed = d.getDate();
                    const em = d.getMonth();

                    // console.log(d.getDate());
                    // console.log(d.getMonth());
                    return day === ed && mon === em
                });
                return response.status(200).json(datas);
            }
            else {
                return response.status(400).json({
                    success: 0,
                    message: "Not added any income yet!"
                });
            }
        });
    },
    getIncomeData: (request, response) => {
        if (!ObjectId.isValid(request.params._id)) {
            return response.sttaus(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }

        Income.findById(request.params._id, (error, result) => {
            if (!error) {
                return response.status(200).json(result);
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving employee"
                });

            }
        })
    },
    updateIncomeData: (request, response) => {
        if (!ObjectId.isValid(request.params._id)) {
            return response.sttaus(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }
        const incdetails = []
        Income.findById(request.params._id, (error, result) => {
            if (!error) {
                incdetails = result
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving income details"
                });
            }
        })

        console.log(incdetails.key);


        let ts = Date.now();
        let date_ob = new Date(ts);
        let d = date_ob.getDate();
        let h = date_ob.getHours();
        let m = date_ob.getMinutes();
        let mo = date_ob.getMonth();
        let y = date_ob.getFullYear();

        let KEY = d + ':' + h + ':' + m;

        const com = "Akshaya Paral";
        const reason = request.body.service;
        var bcharge = request.body.bankcharge;
        var scharge = request.body.servicecharge;
        var bscharge = request.body.bankservicecharge;
        const total = bcharge + scharge + bscharge;

        if (bscharge == null) {
            bscharge = 0;
        }
        if (bcharge == null) {
            bcharge = 0;
        }
        if (scharge == null) {
            scharge = 0;
        }

        const transaction = 'Transaction on ' + reason + ', Updated : ' + d + ':' + mo + ':' + y;


        var inc = new Income({
            company: com,
            service: reason,
            bankcharge: bcharge,
            servicecharge: scharge,
            bankservicecharge: bscharge,
            date: date_ob,
            totalincome: total,
            key: KEY
        });
        Income.findByIdAndUpdate(request.params._id, { $set: inc }, { new: true }, (error, results) => {
            if (!error) {
                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    income: total,
                    date: date_ob,
                    key: KEY
                });
                var query = { key: incdetails.key };
                Statement.updateOne(query, { $set: statement }, (error, result) => {
                    if (!error) {
                        console.log(result);
                        console.log('updated statement');
                    }
                    else {
                        console.log('Error updating income to statement' + JSON.stringify(error, undefined, 2));
                    }
                })
                return response.status(200).json(results);
            }
            else {
                console.log('Error updating income' + JSON.stringify(error, undefined, 2));
            }
        })
    },
    deleteIncomeData: (request, response) => {
        if (!ObjectId.isValid(request.params._id)) {
            return response.status(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }


        Income.findById(request.params._id, (error, result) => {
            if (!error) {
                console.log(result.key);
                const KEY = result.key;
                Income.findByIdAndRemove(request.params._id, { useFindAndModify: false }, (error, result) => {
                    if (!error) {
                        var query = { key: KEY };
                        Statement.deleteOne(query, (error, doc) => {
                            if (!error) {
                                console.log(doc);
                                console.log('deleted statement');
                            }
                            else {
                                console.log('Error deleting statement' + JSON.stringify(error, undefined, 2));
                            }
                        })
                        return response.status(200).json(result);
                    }
                    else {
                        console.log('Error deleting income' + JSON.stringify(error, undefined, 2));
                    }
                });
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving income details"
                });
            }
        })



    }
}