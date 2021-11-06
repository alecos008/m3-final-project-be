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
    .catch((err) => console.log(err));
});

module.exports = router;
