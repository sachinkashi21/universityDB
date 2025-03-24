const User = require("../models/User");
const router = require("express").Router();
const asyncFn = require("../middleware/asyncWrapper");
const {isAdmin, isTeacher} = require("../middleware/authorization");
const jwt = require("jsonwebtoken");

router.post("/register",isAdmin, asyncFn(async (req, res) => {
  const result = await User.createUser(req.body.data);
  if (result.error) {
    return res.json({error:result.error});
  }
  
  res.json({result});
}));

router.post("/login", asyncFn(async (req, res) => {
  const result = await User.login(req.body.data);
  if (result.error) {
    return res.json({error:result.error});
  }
  const token=jwt.sign({userId:result.userId,email:result.email,role:result.role},process.env.JWT_SECRET,{expiresIn:"1h"});
  res.json({token,user:result});
}));

module.exports = router;