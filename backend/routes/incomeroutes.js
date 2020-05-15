const router=require('express').Router();

//calling the required controller
const incomecontroller=require('../controllers/incomecontroller');

router.post('/add',incomecontroller.addincome);








module.exports=router;
