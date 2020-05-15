//modules requiring
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');

//initilization of app
const app=express();

//database connection calling
require('./dbconfig/dbconfiguration');

//routers accessing
const incrouter=require('./routes/incomeroutes')

// var datetime = new Date();
// let date = ("0" + datetime.getDate()).slice(-2);
// console.log(date);


//using required modules
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:4200'}));

//connecting to router
app.use('/income',incrouter)

//server listening to the port given
const port=process.env.PORT || 4000

app.listen(port, (error)=>{
    if(!error){
        console.log('Server Running at ',port)
    }
    else{
        console.log('Server connection failed')
    }
})