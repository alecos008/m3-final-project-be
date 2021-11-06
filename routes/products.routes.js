const router = require("express").Router();
const Product = require("../models/Product.model");

// CREATE A PRODUCT
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
  Product.find()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// EDIT/PATCH PRODUCT
router.patch("/:id", (req, res, next) => {
  const { name, image, description, price, category, stock } = req.body;
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      image,
      description,
      price,
      category,
      stock,
    },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// DELETE A SPECIFIC PRODUCT
router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
  .then((data) => res.json("Successfully deleted" + data._id))
  .catch((err) => next(err))
});

module.exports = router;