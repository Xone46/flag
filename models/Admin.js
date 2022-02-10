const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim : true,
  },
  prenom: {
    type: String,
    required: true,
    trim : true,
  },
  refEmp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim : true,
    unique : false,
  },
  password: {
    type: String,
    required: true,
    trim : true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  code : {
      type : String,
      required : true,
      trim : true
  }
  
});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;