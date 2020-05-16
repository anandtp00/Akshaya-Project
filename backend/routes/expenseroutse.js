const router=require('express').Router();

//calling the required controller
const expensecontroller=require('../controllers/expensecontroller');

router.post('/add',expensecontroller.addexpense);








module.exports=router;
