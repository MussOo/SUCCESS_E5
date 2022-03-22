const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    titre: {
        type: String
        },
    quizz_id: [
        {
        type: mongoose.Schema.Types.ObjectId, ref: 'Quizz'
        }
    ]
});
 

module.exports = mongoose.model('Categorie', categorieSchema);