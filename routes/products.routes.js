const router = require("express").Router();
const Product = require("../models/Product.model");

// CREATING A PRODUCT
router.post("/create", (req, res, next) => {
  const { name, image, description, price, category, stock, addedBy } =
    req.body;

  Product.create({
    name,
    image,
    description,
    price,
    category,
    stock,
    addedBy,
  })
    .then((product) => {
      console.log(`Here is the new product: ${product}`);

      // under here we decide where we want to redirect the user after listing a product
      return res.status(200).json({ product });
    })
    .catch((err) => {
      next(err);
    });
});

// DISPLAY ALL PRODUCTS
router.get("/all", (req, res, next) => {
  Product.find({}, { title: 1 })
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = router;
