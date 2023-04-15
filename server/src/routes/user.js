const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../helper/verifyToken");
const CryptoJS = require("crypto-js");

// get user by id
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all user or filter
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qNew = req.query.new;
  try {
    const users = qNew ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(200).json(err.message);
  }
});

// update
router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_KEY).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {});

module.exports = router;
