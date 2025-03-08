let jwt=require("jsonwebtoken");
require("dotenv").config();

module.exports.isAdmin=(req,res,next)=>{
    const token=req.body.headers.Authorization?.split(" ")[1];
    try{
        const user=jwt.verify(token,process.env.JWT_SECRET);
        if(user.role!=="Admin"){
            return res.json({error:"Unauthorized"});
        }
        req.user=user;
        next();
    } catch(err){
        res.json({error:"Unauthorized, login as admin"});
    }
}
module.exports.isTeacher=()=>{
    
}