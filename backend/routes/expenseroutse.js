const router=require('express').Router();

//calling the required controller
const expensecontroller=require('../controllers/expensecontroller');

router.post('/add',expensecontroller.addExpense);
router.get('/gettodaysexpense',expensecontroller.getTodayExpense);








module.exports=router;
