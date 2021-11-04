const router = require("express").Router();
const Thread = require("../models/Thread.model");

//create a thread element
router.post("/create-thread", (req, res, next) => {
  const { title, description, categories, createdBy, isActive, edit } =
    req.body;
  Thread.create({
    title,
    description,
    categories,
    createdBy,
    isActive,
    edit,
  })
    .then((data) => res.json(data))
    .catch((err) =>
      res.json({
        errorMessage: "Something went wrong while posting your thread!",
      })
    );
});

//Display the list of all threads
router.get("all-thread", (req, res, next) => {
  Thread.find();
});

module.exports = router;
