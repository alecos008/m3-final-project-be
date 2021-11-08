const router = require("express").Router();
const Comment = require("../models/Comment.model");

//create a comment element
router.post("/create", (req, res, next) => {
  const { threadId, userId, description } = req.body;
  Comment.create({
    threadId,
    userId,
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
  const { threadId } = req.params.id;
  Comment.find({ threadId: threadId }, { description: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//Delete a specific element
router.delete("/:id", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((data) => res.json("All good!" + data._id))
    .catch((err) => next(err));
});

router.patch("/:id", (req, res, next) => {
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
