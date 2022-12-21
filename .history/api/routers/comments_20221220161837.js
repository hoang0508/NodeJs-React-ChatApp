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

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.postId === req.body.postId) {
      await post.deleteOne();
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
