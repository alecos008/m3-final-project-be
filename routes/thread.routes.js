const router = require("express").Router();
const Thread = require("../models/Thread.model");

//create a thread element
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

module.exports = router;
