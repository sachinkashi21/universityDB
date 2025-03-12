const router=require('express').Router();

const asyncFn=require('../middleware/asyncWrapper');
const Course=require('../models/Course');

router.get('/',asyncFn(async (req,res)=>{
    let courses;
    if(req.query.excludeClass){
        courses= await Course.getAllExcludingInClass(req.query.excludeClass);
        res.json(courses);
        return;
    }
    courses=await Course.getAll();
    res.json(courses);
}));

module.exports=router;