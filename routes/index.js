const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const threadRoutes = require("./thread.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/product", productsRoutes);

router.use("/thread", threadRoutes);

module.exports = router;
