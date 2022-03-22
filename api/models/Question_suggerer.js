const mongoose = require('mongoose');

const questionsuggerer = mongoose.Schema({
  question: {
    type: String
  },
  sujet: {
    type: String
  },
  Date : {
    type: Date, 
    required: false
  }
});


module.exports = mongoose.model('Questionsuggerer', questionsuggerer);