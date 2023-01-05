const router = require("express").Router();
const Comment = require("../models/Comment");

//get comment

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id });
    console.log("🚀 ~ file: comments.js:9 ~ router.get ~ comment", comment);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// tạo commment
router.post("/", async (req, res) => {
  const newComments = new Comment(req.body);
  console.log(req.body);
  try {
    const savedComment = await newComments.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a commment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.postId === req.body.postId) {
      await comment.deleteOne();
      res.status(200).json("Bình luận này đã được xóa");
    } else {
      res.status(403).json("Bạn chỉ có thể xóa bình luận của bạn");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update comment
router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.postId === req.body.postId) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(403).json("Bạn chỉ có thể cập nhật bài viết của bạn");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
