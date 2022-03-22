const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  prenom: {
    type: String
  },
  nom: {
    type: String 
  },
  password: {
    type: String
  },
  type_de_compte: {
    type: String
  }
});


module.exports = mongoose.model('User', userSchema);