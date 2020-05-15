const router=require('express').Router();

const incomecontroller=require('../controllers/incomecontroller');

router.post('/add',incomecontroller.addincome);








module.exports=router;
