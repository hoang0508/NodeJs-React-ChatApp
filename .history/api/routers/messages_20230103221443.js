const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
// router.delete("/:id", async (req, res) => {
//   try {
//     const messenger = await Comment.findById(req.params.id);
//     if (messenger.postId === req.body._id) {
//       await comment.deleteOne();
//       res.status(200).json("the comment has been deleted");
//     } else {
//       res.status(403).json("you can delete only your comment");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
