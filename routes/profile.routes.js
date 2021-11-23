const router = require("express").Router();
const User = require("../models/User.model");
const Thread = require("../models/Thread.model");
const Product = require("../models/Product.model");
const { isLoggedIn } = require("../middlewares/authorization");

router.get("/", isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json({ err }));
});

router.patch("/edit-pic", (req, res, next) => {
  const { profilePic } = req.body;
  User.findByIdAndUpdate(req.session.user._id, { profilePic }, { new: true })
    .then((editedUser) => {
      res.status(200).json({ editedUser });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = router;
