const router = require("express").Router();
const Thread = require("../models/Thread.model");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  },

  isThreadOwner: (req, res, next) => {
    Thread.find({ createdBy }).then((response) => {
      console.log(response);
    });
    // if (req.session.user._id === data.createdBy) {
    //   next();
    // } else {
    //   res.status(403).json({ message: "You are not authorized" });
    // }
  },
};
