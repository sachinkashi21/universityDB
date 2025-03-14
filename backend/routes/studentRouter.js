const router=require("express").Router();
const asyncFn=require("../middleware/asyncWrapper");
const Student=require("../models/Student");

router.get("/", asyncFn(async (req, res) => {
    let students = await Student.getAll();
    
    if (req.query.exceptClass) {
        const exceptClassId = Number(req.query.exceptClass); // Ensure correct type
        students = students.filter(student => student.CurrentClassId !== exceptClassId);
    }

    res.json({ students });
}));

module.exports=router;