const router = require("express").Router();
const Package = require("../models/Package");

// GET
router.get("/", async (req,res)=>{
    const data = await Package.find();
    res.json(data);
});

// ADD
router.post("/", async (req,res)=>{
    const pkg = new Package(req.body);
    await pkg.save();
    res.json(pkg);
});

module.exports = router;