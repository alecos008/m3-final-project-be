const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const threadRoutes = require("./thread.routes");
const commentRoutes = require("./comment.routes");
const profileRoutes = require("./profile.routes");
const paymentRoutes = require("./payments.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/product", productsRoutes);

router.use("/thread", threadRoutes);

router.use("/comment", commentRoutes);

router.use("/profile", profileRoutes);

router.use("/payments", paymentRoutes);

//CLOUDINARY ROUTE
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file upload!"));
    return;
  }
  res.json({ imagePath: req.file.path });
});
module.exports = router;
