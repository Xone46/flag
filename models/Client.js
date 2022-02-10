const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
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
  adresse: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
    trim : true,
  },
  ville: {
    type: String,
    required: true,
    trim : true,
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
  telephone : {
    type: Number,
    required: true,
    trim : true,

  },
  refClient: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nomSociete : {
    type : String,
    required : true,
  },
  cas : {
    type : String,
    required : true,
  }
  
});
const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;