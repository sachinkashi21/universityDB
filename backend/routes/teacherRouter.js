const router=require("express").Router();
const asyncFn=require("../middleware/asyncWrapper");
const Teacher=require("../models/Teacher");

router.get("/",asyncFn(async(req,res)=>{
    let teachers=await Teacher.getAll();
    res.json(teachers);
}))

module.exports=router;