const User = require("../models/User");
const router = require("express").Router();
const asyncFn = require("../middleware/asyncWrapper");

router.post("/register", asyncFn(async (req, res) => {
  const result = await User.createUser(req.body);
  if (result.error) {
    res.send({
      error:result.error
    });
  } else {
    res.send(result);
  }
}));

router.post("/login", asyncFn(async (req, res) => {
  const result = await User.login(req.body);
  if (result.error) {
    res.send({
        error:result.error  
    });
  } else {
    res.send(result);
  }
}));

module.exports = router;