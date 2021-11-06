const router = require("express").Router();
const { isThreadOwner } = require("../middlewares/authorization");
const Thread = require("../models/Thread.model");

//create a comment element
router.post("/create", (req, res, next) => {
  const { title, description, categories, createdBy } = req.body;
  Thread.create({
    title,
    description,
    categories,
    createdBy,
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
  Thread.find({}, { title: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//Display a specific thread element with all the info
router.get("/:id", (req, res, next) => {
  Thread.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

//Delete a specific thread element
router.delete("/:id", (req, res, next) => {
  Thread.findByIdAndDelete(req.params.id)
    .then((data) => res.json("All good!" + data._id))
    .catch((err) => next(err));
});

router.patch("/:id", (req, res, next) => {
  const { title, description, categories, createdBy, isActive, edit } =
    req.body;
  Thread.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      categories,
      createdBy,
      isActive,
      edit,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
