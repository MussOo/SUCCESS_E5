const mongoose = require('mongoose');

const groupeSchema = mongoose.Schema({
    nom_groupe: {
      type: String
  },
    membres: [{
      id_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
});

module.exports = mongoose.model('Groupe', groupeSchema);