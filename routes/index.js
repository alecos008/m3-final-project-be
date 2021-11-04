const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/product", productsRoutes);

module.exports = router;
