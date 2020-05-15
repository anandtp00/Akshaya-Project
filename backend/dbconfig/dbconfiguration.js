require('dotenv').config();
const mongoose=require('mongoose');
const user=process.env.mongoUser;
const pass=process.env.mongoPass;
const url= user+':'+pass;

//mongodb cluster connection url
mongoose.connect('mongodb+srv://'+url+'@akshayahrm-nw0kb.mongodb.net/akshayaHRM?retryWrites=true&w=majority',{ useNewUrlParser: true },(error)=>{
    if(!error){
        console.log('MongoDB connection achieved');
    }
    else{
        console.log('Error in DB connection : '+JSON.stringify(error,undefined,2));
    }
});


module.exports=mongoose;