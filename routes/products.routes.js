const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/authorization");
const Product = require("../models/Product.model");

// CREATE A PRODUCT
router.post("/create", isLoggedIn, (req, res, next) => {
  const { name, description, image, price, category, stock } = req.body;

  Product.create({
    name,
    image,
    description,
    price,
    category,
    stock,
    addedBy: req.session.user._id,
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
    .then((products) => res.json(products))
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
    .catch((err) => next(err));
});

router.get("/my-products", (req, res, next) => {
  Product.find({ addedBy: req.session.user._id })
    .then((products) => {
      console.log(`Here are your products, ${products}`);
      res.status(200).json({ products });
    })
    .catch((err) => res.json({ err }));
});

// DISPLAY SINGLE PRODUCT BY ID
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});
module.exports = router;
