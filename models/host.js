const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const host = new Schema(
    {
    name: String, //from form
    email: String, //from form
    password: String, //from form
    phoneNo: String, //from form
    dept: String, //from form
    created_at: String, //from server side
    role: String, //from server side
    visitors: Number //from server side
  });
  
  module.exports = mongoose.model("Host", host);