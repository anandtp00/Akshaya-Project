

//calling the required schema
const Income = require('../models/incomemodel');
const Statement = require('../models/statementmodel');

var ObjectId = require('mongoose').Types.ObjectId;


module.exports = {
    addIncome: async (request, response) => {
        // current timestamp in milliseconds
        let ts = Date.now();
        let date_ob = new Date(ts);
        // let date = date_ob.getDate() + 1;
        // let month = date_ob.getMonth() + 1;
        // let year = date_ob.getFullYear();
        // const today = month + "-" + date + "-" + year;

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
            totalincome: total
        });
        await inc.save((error, result) => {
            if (!error) {

                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    income: total,
                    date: date_ob
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
        const day=dc.getDate();
        const mon =dc.getMonth();
      

        Income.find((error, results) => {
            // console.log(results)
            if (!error) {
                const datas = results.filter((element) => {
                    let d=new Date(element.date);
                    const ed=d.getDate();
                    const em=d.getMonth();
                    
                    // console.log(d.getDate());
                    // console.log(d.getMonth());
                    return day===ed && mon === em
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
    getIncomeData:(request,response) =>{
        if(!ObjectId.isValid(request.params._id)){
            return response.sttaus(400).json({
                success:0,
                message:"No records found with id : ${request.params._id}"
            });
        }

        Income.findById(request.params._id,(error,result)=>{
            if(!error){
                return response.status(200).json(result);
            }
            else{
                console.log(JSON.stringify(error,undefined,2));
                return response.status(400).json({
                    success:0,
                    message: "Error in retriving employee"
                });
                
            }
        })
    },
    updateIncomeData:(request,response)=>{
        if(!ObjectId.isValid(request.params._id)){
            return response.sttaus(400).json({
                success:0,
                message:"No records found with id : ${request.params._id}"
            });
        }

        let ts = Date.now();
        let date_ob = new Date(ts);

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
            totalincome: total
        });
        Income.findByIdAndUpdate(request.params._id,{$set:inc},{new:true},(error,results)=>{
            if(!error){
                var query = {}
                Statement.updateOne()
                return response.status(200).json(results);
            }
            else{

            }
        })
    }
}