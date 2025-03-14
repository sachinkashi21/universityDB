const router = require("express").Router();
const asyncFn=require('../middleware/asyncWrapper');
const Class=require("../models/Class");

router.get("/", asyncFn(async (req, res) => {
    const classes = await Class.getAll();
    res.json(classes);
}));

router.get("/:id", asyncFn(async (req, res) => {
    const clsInfo = await Class.getById(req.params.id);
    res.json(clsInfo);
}));

router.post("/:id/addcourse", asyncFn(async (req, res) => {
    const courses = await Class.addCourse(req.params.id, req.body.data.courseCode, req.body.data.teacherId);
    res.json({message: "Courses added successfully"});
}));

router.post("/:id/addStudents", asyncFn(async (req, res) => {
    await Class.addStudents(req.params.id, req.body.data.students);
    res.json({message: "Courses added successfully"});
}));

router.post("/new",asyncFn(async (req,res)=>{
    const newClassId=await Class.create(req.body.data);
    // console.log(newClass);
    res.json({classId: newClassId});
}));

module.exports = router;