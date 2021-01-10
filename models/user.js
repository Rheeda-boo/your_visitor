const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const user = new Schema(
    {
    name: { 
        type :String,
    },  
    email:  { 
        type :String,
    }, 
    password:  { 
        type :String,
    },  
    phone:  { 
        type :String,
    }, 
    created_at:  { 
        type :String,
    }, 
    role:  { 
        type :String,
    }, 
  });
  
  module.exports = mongoose.model("User", user);