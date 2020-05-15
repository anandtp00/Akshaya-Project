const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');


const app=express();


require('./dbconfig/dbconfiguration');


const incrouter=require('./routes/incomeroutes')

// var datetime = new Date();
// let date = ("0" + datetime.getDate()).slice(-2);
// console.log(date);



app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:4200'}));


app.use('/income',incrouter)


const port=process.env.PORT || 4000

app.listen(port, (error)=>{
    if(!error){
        console.log('Server Running at ',port)
    }
    else{
        console.log('Server connection failed')
    }
})