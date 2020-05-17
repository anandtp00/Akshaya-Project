


const Expense = require('../models/expensemodel');

const Statement = require('../models/statementmodel');


module.exports = {
    addExpense: async (request, response) => {
        //calculating the date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate() + 1;
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        const today = month + "-" + date + "-" + year;

        const com = request.body.company;
        const reason = request.body.expensereason;
        const expenseamount = request.body.amount;

        const transaction = 'Transaction on' + reason;

        var exp = new Expense({
            company: com,
            expensereason: reason,
            amount: expenseamount,
            date: today
        });
        await exp.save((error, result) => {
            if (!error) {
                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    expense: expenseamount,
                    date: today
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
    getDatedExpense:(request,response)=>{
        const date=request.body.date;
        let dc = new Date(date);
        let d = dc.getDate() + 1;
        let m = dc.getMonth() + 1;
        let y = dc.getFullYear();
        const ED = m + "-" + d + "-" + y;
        
        let datecheck = new Date(ED);


        console.log(datecheck);

         Expense.find((error,results)=>{
             if(!error){
                results.forEach((element)=>{
                    //  console.log(element.date)
                    //  let date_ob = new Date(element.date);
                    //  let day = date_ob.getDate() - 1;
                    //  let month = date_ob.getMonth() + 1;
                    //  let year = date_ob.getFullYear();
                    //  const expDate = month + "-" + day + "-" + year;
                    //  console.log(expDate)
                    //  return element.date === datecheck

                    if(element.date === datecheck){
                        console.log(element);
                    }
                 });
                //  console.log(expenseDatas);
             }
             else{
                 console.log('NOOO')
             }

         });
         
    }

}