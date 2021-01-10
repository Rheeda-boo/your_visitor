const express = require("express");
const router = express.Router();
const Guest = require("../models/guest");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/addGuest", (req, res) => {
    const { name, email, password, password2, role, phoneNo } = req.body;
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
          const newUser = new User({
            name: name,
            email: email,
            password: password,
            role: role,
            phoneNo : phoneNo,
            

          });
  
          //hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser
                .save()
                .then((value) => {
                  // console.log(value);
                //   req.flash("success_msg", "You have now registered!");
                //   res.redirect("/admin/allusers");
                res.send("Guest Created")
                })
                .catch((value) => console.log(value));
            })
          );

          
        const newGuest = new Guest({
            name: name,
            email: email,
            password: password,
            // role: role,
            // hostName: hostName,
            phoneNo : phoneNo,
            
            
        });
  
          //hash password
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newGuest.password, salt, (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newGuest.password = hash;
              //save user
              newGuest
                .save()
                .then((value) => {
                  // console.log(value);
                //   req.flash("success_msg", "You have now registered!");
                //   res.redirect("/admin/allusers");
                res.send("Guest Created")
                })
                .catch((value) => console.log(value));
            })
          );
        }
        }
      );
    }
  })

  module.exports = router