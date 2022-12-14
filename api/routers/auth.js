const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//register
router.post("/register", async (req, res) => {
  try {
    // //sinh páss mới
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // tạo user mới
    console.log(req.body);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      sdt: req.body.sdt,
    });
    // lưu user và guiowr trả
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    // const validPassword = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    const validPassword = await User.findOne({ password: req.body.password });
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
