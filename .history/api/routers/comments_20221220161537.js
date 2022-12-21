const router = require("express").Router();
const Comment = require("../models/Comment");

// tạo commment
router.post("/", async (req, res) => {
  console.log({ req: req.body });
  const newComments = new Comment(req.body);
  try {
    const savedComment = await newComments.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
