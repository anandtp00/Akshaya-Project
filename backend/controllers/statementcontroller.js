const Statement = require('../models/statementmodel');


module.exports = {
    getTodaysStatement:(request,response)=>{
        let ts = Date.now();
        let dc = new Date(ts);
        const day=dc.getDate();
        const mon =dc.getMonth();
        console.log(day,mon);
      

        Statement.find((error, results) => {
            console.log(results)
            if (!error) {
                const datas = results.filter((element) => {
                    let d=new Date(element.date);
                    const ed=d.getDate();
                    const em=d.getMonth();
                    
                    console.log(ed);
                    console.log(em);
                    return day===ed && mon === em
                });
                console.log(datas);
                return response.status(200).json(datas);
            }
            else {
                return response.status(400).json({
                    success: 0,
                    message: "No statements yet!"
                });
            }
        });
    }
}