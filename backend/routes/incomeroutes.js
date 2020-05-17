const router=require('express').Router();

//calling the required controller
const incomecontroller=require('../controllers/incomecontroller');

router.post('/add',incomecontroller.addIncome);
router.get('/gettodaysincome',incomecontroller.getTodayIncome);









module.exports=router;
