const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    // encrypt pass
    password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_KEY).toString(),
    gender: req.body.gender,
  });
  try {
    const savedResult = await newUser.save();
    res.status(201).json(savedResult);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong credentials");

    //1. decrypt pass
    const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);

    //2. transform to plain text
    const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) return res.status(401).json("Wrong credentials");

    // will receive jwt token, relative on user role
    const tokenRole = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3 days" }
    );

    // eliminating result view
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, tokenRole });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
