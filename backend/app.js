let express=require("express");
let app=express();
require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("Get: home route");
})

app.listen(process.env.PORT,()=>{
    console.log("-->app listening on port:",process.env.PORT);
});