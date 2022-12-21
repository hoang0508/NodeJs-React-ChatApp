const router = require("express").Router();
const Comment = require("../models/Comment");

//get comment

router.get("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const comment = await Comment.findOne({ postId: req.params.id });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// tạo commment
router.post("/", async (req, res) => {
  const newComments = new Comment(req.body);
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
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("you can delete only your comment");
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
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
