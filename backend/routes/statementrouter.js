const router=require('express').Router();

//calling the required controller
const statementcontroller=require('../controllers/statementcontroller');


router.get('/todaysstatement',statementcontroller.getTodaysStatement);









module.exports=router;
