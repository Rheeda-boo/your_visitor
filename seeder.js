const database = require("./config/database");
const Admin = require("./models/admin");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const importData = () => {
  const newAdmin = new Admin({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",

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
          console.log(value);
         process.exit(0);
        })
        .catch((value) =>{
            console.log(value);
            process.exit(1);
        } );
    })
  );
};

importData();

const importNewData = () => {
  
    const newUser = new User({
      name: "User",
      email: "1admin@gmail.com",
      password: "admin123",
      role: "admin",
  
    });
  

    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //save pass to hash
        newUser.password = hash;
        //save user
        newUser
          .save()
          .then((value) => {
            console.log(value);
           process.exit(0);
          })
          .catch((value) =>{
              console.log(value);
              process.exit(1);
          } );
      })
    );
};

importNewData()