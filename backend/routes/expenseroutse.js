const router=require('express').Router();

//calling the required controller
const expensecontroller=require('../controllers/expensecontroller');

router.post('/add',expensecontroller.addExpense);
router.get('/gettodaysexpense',expensecontroller.getTodayExpense);

router.put('/updateexpense/:id',expensecontroller.updateExpenseData);
router.get('/deleteexpense/:_id',expensecontroller.deleteExpenseData);








module.exports=router;
