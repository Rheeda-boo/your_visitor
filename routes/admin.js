const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Host = require("../models/host");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/addAdmin", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const phoneNo = req.body.phoneNo;

  // console.log(req.body);

  let errors = [];
  // console.log(" Name " + name + " email :" + email + " pass:" + password);
  if (!name || !email || !password || !password2 || !phoneNo) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
    // }
    // if (errors.length > 0) {
    //   res.render("admin/allusers", {
    //     errors: errors,
    //     name: name,
    //     email: email,
    //     password: password,
    //     password2: password2,
    //     phoneNo : phoneNo,
    //   });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      // console.log(user);
      if (user) {
        errors.push({ msg: "Email already registered" });
        //   res.render("admin/adduser", {
        //     errors,
        //     name,
        //     email,
        //     password,
        //     password2,
        //   });
      } else {
        const newAdmin = new Admin({
          name: name,
          email: email,
          password: password,
          // role: role,
          phoneNo: phoneNo,
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newAdmin.password = hash;
            //save user
            newAdmin
              .save()
              .then((value) => {
                // console.log(value);
                //   req.flash("success_msg", "You have now registered!");
                //   res.redirect("/admin/allusers");
                res.send("Admin Created");
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
});

router.post("/addHost", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const phoneNo = req.body.phoneNo;

  console.log(req.body);

  let errors = [];
  // console.log(" Name " + name + " email :" + email + " pass:" + password);
  if (!name || !email || !password || !password2 || !phoneNo) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
    // }
    // if (errors.length > 0) {
    //   res.render("admin/allusers", {
    //     errors: errors,
    //     name: name,
    //     email: email,
    //     password: password,
    //     password2: password2,
    //     phoneNo : phoneNo,
    //   });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      // console.log(user);
      if (user) {
        errors.push({ msg: "Email already registered" });

        res.send(errors);
        //   res.render("admin/adduser", {
        //     errors,
        //     name,
        //     email,
        //     password,
        //     password2,
        //   });
      } else {
        const newHost = new Host({
          name: name,
          email: email,
          password: password,
          // role: role,
          phoneNo: phoneNo,
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.log(err);
            throw err;
          } else {
            console.log(salt);
            bcrypt.hash(newHost.password, salt, (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newHost.password = hash;
              //save user
              newHost
                .save()
                .then((value) => {
                  // console.log(value);
                  //   req.flash("success_msg", "You have now registered!");
                  //   res.redirect("/admin/allusers");
                  res.send("Host Created");
                })
                .catch((value) => console.log(value));
            });
          }
        });
      }
    });
  }
});

module.exports = router;
