const mongoose = require('mongoose');

const listequestionpasserSchema = mongoose.Schema({
    id_collaborateur: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  id_quizz : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Quizz'
  },
  code : {
    type: String
  },
    question: [{
      id_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
      passer : {type: Boolean, required: false}
    }],
    reponse_eleve: [{
    
    id_question : {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    reponse : [],
    reponse_libre : {type: Boolean, required: false}
  
  }]
});

module.exports = mongoose.model('ListeQuestionPasser', listequestionpasserSchema);