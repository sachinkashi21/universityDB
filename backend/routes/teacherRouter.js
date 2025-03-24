const router=require("express").Router();
const asyncFn=require("../middleware/asyncWrapper");
const Teacher=require("../models/Teacher");

router.get("/",asyncFn(async(req,res)=>{
    let teachers=await Teacher.getAll();
    res.json(teachers);
}))
router.get("/dashboard/:id",asyncFn(async(req,res)=>{
    // console.log(req.params.id);
    let data=await Teacher.get(req.params.id);
    // console.log(data);
    res.json(data);
}))
router.get(
    "/:id/:classId/:courseId",
    asyncFn(async (req, res) => {
      const { classId, courseId } = req.params;
  
      try {
        // Fetch data using the Teacher module
        const lectures = await Teacher.getLectures(classId, courseId);
        const assignments = await Teacher.getAssignments(classId, courseId);
        const students = await Teacher.getStudents(classId);
        const attendance = await Teacher.getAttendance(classId, courseId);
  
        // Send the data as a JSON response
        res.json({
          lectures,
          assignments,
          students,
          attendance,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
      }
    })
  );

module.exports=router;