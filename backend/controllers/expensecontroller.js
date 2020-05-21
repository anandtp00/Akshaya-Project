var ObjectId = require('mongoose').Types.ObjectId;


const Expense = require('../models/expensemodel');

const Statement = require('../models/statementmodel');


module.exports = {
    addExpense: async (request, response) => {
        //calculating the date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let d = date_ob.getDate();
        let h = date_ob.getHours();
        let m = date_ob.getMinutes();

        let KEY = d+':'+h+':'+m;


        const com = "Akshaya Paral";
        const reason = request.body.expensereason;
        const expenseamount = request.body.amount;

        const transaction = 'Transaction on ' + reason;

        var exp = new Expense({
            company: com,
            expensereason: reason,
            amount: expenseamount,
            date: date_ob,
            key:KEY
        });
        await exp.save((error, result) => {
            if (!error) {
                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    expense: expenseamount,
                    date: date_ob,
                    key:KEY
                });
                statement.save((error, result) => {
                    if (!error) {
                        console.log(result);
                        console.log('Added to statement');
                    }
                    else {
                        console.log('Error adding expense to statement' + JSON.stringify(error, undefined, 2));
                    }
                });
                console.log(result);
                response.status(200).json({
                    success: 1,
                    message: "Expense added",
                    data: result
                });
            }
            else {
                console.log('Error adding expense' + JSON.stringify(error, undefined, 2));
            }
        });
    },
    getTodayExpense: (request, response) => {
        let ts = Date.now();
        let dc = new Date(ts);
        const day=dc.getDate();
        const mon =dc.getMonth();

        console.log(dc);

        Expense.find((error, results) => {
            console.log(results)
            if (!error) {
                const datas = results.filter((element) => {
                    let d=new Date(element.date);
                    const ed=d.getDate();
                    const em=d.getMonth();
                    return day===ed && mon === em
                });
                return response.status(200).json(datas);
            }
            else {
                return response.status(400).json({
                    success: 0,
                    message: "Not added any expense yet!"
                });
            }

        });
    },
    getExpenseData: (request, response) => {
        if (!ObjectId.isValid(request.params._id)) {
            return response.sttaus(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }
        Expense.findById(request.params._id, (error, result) => {
            if (!error) {
                return response.status(200).json(result);
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving Expense"
                });
            }
        })
    },
    updateExpenseData: (request, response) => {
        if (!ObjectId.isValid(request.params.id)) {
            return response.status(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }

        let ts = Date.now();
        let date_ob = new Date(ts);
        let d = date_ob.getDate();
        let h = date_ob.getHours();
        let m = date_ob.getMinutes();
        let mo = date_ob.getMonth();
        let y = date_ob.getFullYear();

        let KEY = d + ':' + h + ':' + m;

        const com = "Akshaya Paral";
        const reason = request.body.expensereason;
        const expenseamount = request.body.amount;

        const transaction = 'Transaction on ' + reason+' Updated : '+ d + ':' + mo + ':' + y;

        var exp = {
            company: com,
            expensereason: reason,
            amount: expenseamount,
            date: date_ob,
            key:KEY
        };
        Expense.findById(request.params.id, (error, result) => {
            if (!error) {
                const resultkey = result.key;
                Expense.findByIdAndUpdate(request.params.id, { $set: exp },{ useFindAndModify: false }, (error, results) => {
                    if (!error) {
                        var statement = {
                            company: com,
                            transactiondetails: transaction,
                            expense: expenseamount,
                            date: date_ob,
                            key: KEY
                        };
                        var query = { key: resultkey };
                        Statement.updateOne(query, { $set: statement }, (error, result) => {
                            if (!error) {
                                console.log(result);
                                console.log('updated statement');
                            }
                            else {
                                console.log('Error updating expense to statement' + JSON.stringify(error, undefined, 2));
                            }
                        })
                        return response.status(200).json(results);
                    }
                    else {
                        console.log('Error updating Expense' + JSON.stringify(error, undefined, 2));
                    }
                })
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving expense details"
                });
            }
        })
    },
    deleteExpenseData: (request, response) => {
        if (!ObjectId.isValid(request.params._id)) {
            return response.status(400).json({
                success: 0,
                message: "No records found with id : ${request.params._id}"
            });
        }
        Expense.findById(request.params._id, (error, result) => {
            if (!error) {
                console.log(result.key);
                const KEY = result.key;
                Expense.findByIdAndRemove(request.params._id, { useFindAndModify: false }, (error, result) => {
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
                        console.log('Error deleting Expense' + JSON.stringify(error, undefined, 2));
                    }
                });
            }
            else {
                console.log(JSON.stringify(error, undefined, 2));
                return response.status(400).json({
                    success: 0,
                    message: "Error in retriving Expense details"
                });
            }
        })
    }
}