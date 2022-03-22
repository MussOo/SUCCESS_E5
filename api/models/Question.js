const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  id_question: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Question'
  },
  reponse_eleve: {
    type: String
  },
  question: {
    type: String
  },
  QCM: {
    type: Boolean
  },
  point: {
    type: Number
  },
  time: {
    type: Number
  },
  proposition: [
    {type: String, required: false}

    ],
  bonne_reponse: [
    {type: String, required: false}
  ]

});


module.exports = mongoose.model('Question', questionSchema);