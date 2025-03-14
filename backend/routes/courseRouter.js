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

router.post('/new',asyncFn(async(req,res)=>{
    await Course.create(req.body.data);
    res.json({message:`Course Created Successfully`});
}))

module.exports=router;