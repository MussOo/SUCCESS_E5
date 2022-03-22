const Question = require("../models/Question");
const User = require("../models/User");
const Quizz = require("../models/Quizz");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports.ListUser = async (req, res) => {

    User.find({},{},function(err,docs) {
        res.send(docs);
      });
}
 
module.exports.auth = async (req, res) => { 

    let data = req.body
      User.findOne({ username: data.username })
      .then(user => {
         console.log(user)
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(data.password, user.password)
          .then(valid => { console.log(valid)
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              type_de_compte: user.type_de_compte
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    
}