const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/authorization");
const { isThreadOwner } = require("../middlewares/authorization");
const Thread = require("../models/Thread.model");

//create a comment element
router.post("/create", isLoggedIn, (req, res, next) => {
  const { title, description, category } = req.body;
  Thread.create({
    title,
    description,
    category,
    createdBy: req.session.user._id,
  })
    .then((data) => {
      console.log(`Here is your thread ${data}`);
      res.status(200).json({ data });
    })
    .catch((err) =>
      res.json({
        errorMessage: "Something went wrong while posting your thread!",
      })
    );
});

//Display the list of all threads
router.get("/all", (req, res, next) => {
  Thread.find()
    .populate("createdBy")
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//Display the threads of one user
router.get("/my-threads", (req, res, next) => {
  Thread.find({ createdBy: req.session.user._id })
    .then((threads) => {
      res.status(200).json({ threads });
    })
    .catch((err) =>
      res.json({
        errorMessage: "Something went wrong while posting your thread!",
      })
    );
});

//Display a specific thread element with all the info
router.get("/:id", (req, res, next) => {
  Thread.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

//Delete a specific thread element
router.delete("/:id", isThreadOwner, (req, res, next) => {
  Thread.findByIdAndDelete(req.params.id)
    .then((data) => {
      console.log(data);
      res.json("All good!" + data._id);
    })
    .catch((err) => next(err));
});

router.patch("/:id", (req, res, next) => {
  const { title, description, categories, isActive } = req.body;
  const { id } = req.params;

  Thread.findById(id).then((singleThread) => {
    if (req.session.user._id.toString() === singleThread.createdBy.toString()) {
      Thread.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          categories,
          createdBy: req.session.user._id,
          isActive,
          edit: true,
        },
        { new: true }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => next(err));
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  });
});

module.exports = router;
