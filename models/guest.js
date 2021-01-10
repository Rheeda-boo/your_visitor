const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const guest = new Schema(
    {
    name: String, 
    phone: String, 
    email: String, 
    password: String, 
    status: String, 
    checkIn: String, 
    checkOut: String, 
    hostName: String, 
    hostEmail: String, 
    hostPhone: String, 
    deptVisited: String,
    createdAt : String, 
    role: String, 
    visits: Number 
  }
  );
  
  module.exports = mongoose.model("Guest", guest);