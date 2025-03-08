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

module.exports = router;