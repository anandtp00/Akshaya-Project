const router=require('express').Router();

//calling the required controller
const incomecontroller=require('../controllers/incomecontroller');

router.post('/add',incomecontroller.addIncome);
router.get('/gettodaysincome',incomecontroller.getTodayIncome);

router.get('/updateincome/:_id',incomecontroller.updateIncomeData);
router.get('/deleteincome/:_id',incomecontroller.deleteIncomeData);



module.exports=router;
