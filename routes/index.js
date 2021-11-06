const router = require("express").Router();
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const threadRoutes = require("./thread.routes");
const commentRoutes = require("./comment.routes");
const profileRoutes = require("./profile.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/product", productsRoutes);

router.use("/thread", threadRoutes);

router.use("/comment", commentRoutes);

router.use("/profile", profileRoutes);

module.exports = router;
