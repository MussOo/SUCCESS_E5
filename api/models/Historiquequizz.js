const mongoose = require('mongoose');

const historiquequizzSchema = mongoose.Schema({
    id_collaborateur: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  id_quizz : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Quizz'
  },
    reponse: [{
      id_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
      reponse_eleve: [],
      point : {type: Number, required: false},
      QCM : {type: Boolean, required: false},
      corriger : {type: Boolean, required: false},
      bonne_reponse : {type: Boolean, required: false}
    }],
    note_total : {type: Number, required: false},
    Date : {type: Date, required: false},
});

module.exports = mongoose.model('Historiquequizz', historiquequizzSchema);