const mongoose = require('mongoose');

const quizzSchema = mongoose.Schema({
    titre: {
        type: String
        },
    question_id: [
        {
        type: mongoose.Schema.Types.ObjectId, ref: 'Question'
        }
    ]
});


module.exports = mongoose.model('Quizz', quizzSchema);