


const Expense = require('../models/expensemodel');

const Statement = require('../models/statementmodel');


module.exports = {
    addExpense: async (request, response) => {
        //calculating the date
        let ts = Date.now();
        let date_ob = new Date(ts);
        // let date = date_ob.getDate() + 1;
        // let month = date_ob.getMonth() + 1;
        // let year = date_ob.getFullYear();
        // const today = month + "-" + date + "-" + year;

        const com = "Akshaya Paral";
        const reason = request.body.expensereason;
        const expenseamount = request.body.amount;

        const transaction = 'Transaction on ' + reason;

        var exp = new Expense({
            company: com,
            expensereason: reason,
            amount: expenseamount,
            date: date_ob
        });
        await exp.save((error, result) => {
            if (!error) {
                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    expense: expenseamount,
                    date: date_ob
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
    }
}