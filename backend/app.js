let express=require("express");
let app=express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
let cors=require("cors");
let corsOptions={origin:"*",optionsSuccessStatus:204,allowesHeaders:"*",methods:"GET,POST,PUT,DELETE"};
app.use(cors(corsOptions));


let userRouter=require("./routes/userRouter");
let classRouter=require("./routes/classRouter");
let courseRouter=require("./routes/courseRouter");
let teacherRouter=require("./routes/teacherRouter");
let studentRouter=require("./routes/studentRouter");
let lectureRouter=require("./routes/lectureRouter");
let reportRouter=require("./routes/reportRouter");

app.get("/",(req,res)=>{
    res.send("Get: home route");
})
app.use("/user",userRouter);
app.use("/class",classRouter);
app.use("/course",courseRouter);
app.use("/teacher",teacherRouter);
app.use("/student",studentRouter);
app.use("/lecture",lectureRouter);
app.use("/report",reportRouter);
 
app.use((err,req,res,next)=>{
    console.error(err.message);
    res.send({status: 500, error:(err.message)?err.message:"Something broke"});
});
app.listen(process.env.PORT,()=>{
    console.log("-->app listening on port:",process.env.PORT);
});