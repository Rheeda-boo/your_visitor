const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// router.get("/login", (req, res) => {

//   res.render("users/login");
// });


router.post("/login", (req, res, next) => {
  passport.authenticate('local', res.send("Logged in"))(req,res,next);


});

module.exports = router;

