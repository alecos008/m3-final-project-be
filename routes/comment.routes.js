const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/authorization");
const { isCommentOwner } = require("../middlewares/authorization");
const Comment = require("../models/Comment.model");

//create a comment element
router.post("/create/:threadId", isLoggedIn, (req, res, next) => {
  const { description } = req.body;
  const { threadId } = req.params;
  Comment.create({
    threadId,
    userId: req.session.user._id,
    description,
  })
    .then((data) => {
      console.log(`Here is your comment ${data}`);
      res.status(200).json({ data });
    })
    .catch((err) =>
      res.json({
        errorMessage: "Something went wrong while posting your comment!",
      })
    );
});

router.get("/all/:threadId", (req, res, next) => {
  const { threadId } = req.params;
  Comment.find({ threadId: threadId }, { description: 1, userId: 1 })
    .populate("userId")
    //use map to send correct user info to front end
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

//Delete a specific element
router.delete("/:id", isCommentOwner, (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((data) => res.json("All good!" + data._id))
    .catch((err) => next(err));
});

router.patch("/:id", isCommentOwner, (req, res, next) => {
  const { description } = req.body;
  Comment.findByIdAndUpdate(
    req.params.id,
    {
      description,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
