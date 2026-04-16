const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({...req.body, password: hashed});
    await user.save();
    res.json({msg: "User Registered"});
});

// LOGIN
router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.json({msg: "User not found"});

    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) return res.json({msg: "Invalid password"});

    res.json({msg: "Login success"});
});

module.exports = router;