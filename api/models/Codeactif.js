const mongoose = require('mongoose');

const codeactifSchema = mongoose.Schema({
  code: {
    type: String
  },
  id_quizz: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Quizz'
  },
  actif: {
    type: Boolean
  }
});


module.exports = mongoose.model('Codeactif', codeactifSchema);