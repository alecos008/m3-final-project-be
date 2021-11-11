const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const { username, password, email, city, profilePic } = req.body;

  //* Here we test if the user filled all the inputs
  if (!username || !password || !email || !city || !profilePic) {
    return res.status(400).json({ errorMessage: "Please fill all the fields" });
  }

  //* Here we define & test if user entered a valid email
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({ errorMessage: "Please enter a valid email" });
  }

  //* Here we define & test if user entered a valid email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!passwordRegex.test(password)) {
    res.status(400).json({ errorMessage: "Please enter a valid password" });
  }

  User.findOne({ email })
    //* Here we check if the email matches with a existing user & send error
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ errorMessage: "Email already taken" });
      }

      //* Here we define the salt used for hashing the password
      const saltRounds = 10;
      return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          //*Here we create the user in the DB
          User.create({ username, profilePic, email, city, password: hashedPassword })
            .then((user) => {
              req.session.user = user;
              res.status(200).json(user);
            })
            .catch((err) => {
              res.json({
                errorMessage:
                  "Something went wrong while creating your user. Please try again",
              });
            });
        })
        .catch((err) =>
          res.status(500).json({
            errorMessage: "Somethgin whent wrong while encrypting password",
          })
        );
    })
    .catch((err) => res.status(500).json({ err }));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  //* Here we check if the user filled both inputs
  if (!email || !password) {
    return res.status(500).json({
      errorMessage: `Please fill all the fields. You are missing the ${
        username ? "password" : "username"
      }`,
    });
  }

  User.findOne({ email }).then((user) => {
    //Here we check if user exists in DB
    if (!user) {
      return res
        .status(500)
        .json({ errorMessage: "Email not registered! Please signup." });
    }

    //Here we check if password matches
    bcrypt
      .compare(password, user.password)
      .then((passwordMatch) => {
        if (!passwordMatch) {
          return res.status(500).json({ errorMessage: "Wrong password mate" });
        }

        req.session.user = user;
        return res.status(200).json(user);
      })
      .catch((err) => next(err));
  });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        errorMessage: `Something went wrong with the logout: ${error.message}`,
      });
    }
    res.json({ successMessage: "Logged out!" });
  });
});

router.get("/loggedin", (req, res, next) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(403).json({ errorMessage: "You're not authenticated." });
});

module.exports = router;
