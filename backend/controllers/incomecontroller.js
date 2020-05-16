

//calling the required schema
const Income = require('../models/incomemodel');
const Statement = require('../models/statementmodel');


module.exports = {
    addincome: async (request, response) => {
        // current timestamp in milliseconds
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate() + 1;
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        const today = month + "-" + date + "-" + year;

        const com = request.body.company;
        const reason = request.body.service;
        const bcharge = request.body.bankcharge;
        const scharge = request.body.servicecharge;
        const bscharge = request.body.bankservicecharge;
        const total = bcharge + scharge + bscharge;

        const transaction = 'Transaction on ' + reason;


        var inc = new Income({
            company: com,
            service: reason,
            bankcharge: bcharge,
            servicecharge: scharge,
            bankservicecharge: bscharge,
            date: today,
            totalincome: total
        });
        await inc.save((error, result) => {
            if (!error) {

                var statement = new Statement({
                    company: com,
                    transactiondetails: transaction,
                    income: total,
                    date: today
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
    }
}