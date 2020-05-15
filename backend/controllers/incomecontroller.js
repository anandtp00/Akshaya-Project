


const Income = require('../models/incomemodel');


module.exports = {
    addincome: async (request, response) => {
        // current timestamp in milliseconds
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate()+1;
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        const today=month + "-" + date + "-" + year;


        const bankcharge= request.body.bankcharge;
        const servicecharge= request.body.servicecharge;
        const bankservicecharge= request.body.bankservicecharge;

        const total=bankcharge+servicecharge+bankservicecharge;
        console.log(total);

        
        var inc = new Income({
            company: request.body.company,
            service: request.body.service,
            bankcharge: request.body.bankcharge,
            servicecharge: request.body.servicecharge,
            bankservicecharge: request.body.bankservicecharge,
            date: today,
            totalincome: total
        });
        await inc.save((error, result) => {
            if (!error) {
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