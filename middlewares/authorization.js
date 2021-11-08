const router = require("express").Router();
const Product = require("../models/Product.model");
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
    const { id } = req.params;
    Thread.findById(id).then((singleThread) => {
      if (req.session.user._id === singleThread.createdBy) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized" });
      }
    });
  },

  isCommentOwner: (req, res, next) => {
    const { id } = req.params;
    Comment.findById(id).then((singleComment) => {
      if (req.session.user._id === singleComment.userId) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized" });
      }
    });
  },

  isProductOwner: (req, res, next) => {
    const { id } = req.params;
    Product.findById(id).then((singleProduct) => {
      if (req.session.user._id === singleProduct.addedBy) {
        next();
      } else {
        res.status(403).json({ message: "You are not authorized" });
      }
    });
  },
};
