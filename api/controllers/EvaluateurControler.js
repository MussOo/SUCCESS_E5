const Question = require("../models/Question");
const User = require("../models/User");
const Categorie = require("../models/Categorie");
const Quizz = require("../models/Quizz");
const Groupe = require("../models/Groupe");
const Codeactif = require("../models/Codeactif");
const Historiquequizz = require("../models/Historiquequizz");
const Question_suggerer = require("../models/Question_suggerer.js");
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { LoggerLevel } = require("mongoose/node_modules/mongodb");
const { ObjectID } = require("bson");

module.exports.Quizz = async (req, res) => {

  Categorie.find({_id:req.params.id},{},function(err,docs) {
    if (docs[0].quizz_id.length == 0) {
      res.send('')
  }else{
    res.send(docs);
  }
 
  }).populate('quizz_id');

} 
 
module.exports.Groupe = async (req, res) => {

      Groupe.find({},{},function(err,docs) {
        res.send(docs);
      });

}

module.exports.GroupeID = async (req, res) => {

  Groupe.find({_id:req.params.id},{},function(err,docs) {
    
    if (docs.length == 0) { 

    }else{
   
      
      let membres = [];
 
      for (let i = 0; i < docs[0].membres.length; i++) {
        
      membres.push({
          'id_collab': new ObjectID(docs[0].membres[i].id_user._id),
          "nom": docs[0].membres[i].id_user.nom,
          "prenom": docs[0].membres[i].id_user.prenom,
          "groupe": docs[0].membres[i].id_user.groupe
        })

      }

      res.send(membres)
    }
  }).populate('membres.id_user');

}

module.exports.Question = async (req, res) => {

  Quizz.find({_id:req.params.id},{},function(err,docs) {
    
    if (!docs.length) {
      res.send('')
  }else{
    res.send(docs);
  }
 
  }).populate('question_id');

}


module.exports.creer_question = async (req, res) => {

    data = req.body
    
    var count = data.proposition.length;
    var propal = [];
    var QCM = true 
    var prop

    if(data.proposition[0].propal === ""){
      QCM = false
      
    }else{
      QCM = true
      for (let i = 0; i < count; i++) { 
        propal.push(data.proposition[i].propal)
      }
    }

    const Questionss = new Question({ 
      titre: data.titre,
      aide: data.aide,
      question: data.question,
      QCM: QCM,
      point: data.point,
      time: data.time,
      proposition: propal,
      bonne_reponse: data.bonne_reponse
    });

    Questionss.save(function(err,succes) {
      if(err){
        res.status(400).json({ error })
      }
      if(succes){
        
        Quizz.findOneAndUpdate(
          { _id: req.params.id }, 
          { $push: { question_id: ObjectId(succes.id)  } },
          function (error, success) {
                if (error) {
                    
                } else {
                  
                }
          });
      }
   });  
}

module.exports.categorie= async (req, res) => {

  Categorie.find({},{},function(err,docs) {
    res.send(docs);
  });

}

module.exports.creer_categorie= async (req, res) => {

  let data = req.body

  const categoriee = new Categorie({ 
    titre: data.titre
  });

  categoriee.save(function(err,succes) {
    if(err){
     }
    if(succes){
      
    }
 }); 

}

module.exports.creer_quizz = async (req, res) => {

  let data = req.body
 

  
  Quizz.find({titre : data.titre},{},function(err,docs) {

    if (docs.length == 0) { 
      const Quizzz = new Quizz({ 
        titre: data.titre
      });
      
      Quizzz.save(function(err,succes) {
        if(err){
          res.status(400).json({ error })
        }
        if(succes){
      Categorie.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { quizz_id: ObjectId(succes.id)  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  
              }
        });
        }
      }); 

      res.status(200).send(true)
    }else{
      
      res.status(400).send(false)
    }
  });



}

module.exports.creer_groupe = async (req, res) => {

  let data = req.body

  const Groupeee = new Groupe({ 
    nom_groupe: data.nom_du_groupe
  });

  Groupeee.save(function(err,succes) {
    if(err){
     }
    if(succes){
      
    }
 }); 

}

module.exports.delete_question = async (req, res) => {

let data = req.body

Question.deleteOne({ _id: req.params.id }, function(err, result) {
  if (err) {
    res.send(err);
  } else {
    res.send(result);
  }
});

Quizz.updateOne( {cn: req.body.id_quizz}, { $pullAll: {question_id: [req.params.id] } } )

}

module.exports.delete_quizz = async (req, res) => {
  
  Quizz.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

}
module.exports.delete_categorie = async (req, res) => {
  
  Categorie.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

}


module.exports.delete_groupe = async (req, res) => {
  
  Groupe.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

}

module.exports.getquestioncible = async (req, res) => {

  Question.find({_id : req.params.id},{},function(err,docs) {
    res.send(docs);
  });
  
}

module.exports.SendUpdatequestion = async (req, res) => { 
  

  
  let data = req.body

  var count = data.proposition.length;
  var propal = [];
  var prop

  if(data.proposition[0].propal === ''){
    QCM = false
    
  }else{
    QCM = true
    for (let i = 0; i < count; i++) { 
      propal.push(data.proposition[i].propal)
    }
  }

  Question.updateOne({_id:new ObjectID(req.params.id)},
  {$set:{question : data.question,
          QCM : QCM,
          point : data.point,
          time : data.time,
          proposition : prop,
          bonne_reponse : data.bonne_reponse 
          }},function(err,docs) {
    res.status(200).send(docs)
  });

}


module.exports.generecode = async (req, res) => {

  let CodeR = (Math.random() + 1).toString(36).substring(7).toUpperCase(); 
  
  const code = new Codeactif({ 
    code: CodeR,
    id_quizz : ObjectId(req.params.id),
    actif : true
  });

  code.save(function(err,succes) {
    if(err){
      res.status(400).json({ error })
    }
    if(succes){
      console.log(succes);
    }
 }); 

}

module.exports.Codeactif = async (req, res) => {

  Codeactif.find({actif : true},{},function(err,docs) {
    res.send(docs);
  }).populate('id_quizz');

}


module.exports.listCollaborateur = async (req, res) => {
 
  User.find({type_de_compte : 'collaborateur'},{},function(err,docs) {
    if (docs.length == 0) {

    }else{
      let membres = [];

      for (let i = 0; i < docs.length; i++) {

      membres.push({ 
          "_id": docs[i]._id,
          "username": docs[i].username,
          "nom": docs[i].nom,
          "prenom": docs[i].prenom
        })

      }
      res.send(membres)
    }
  });

}

module.exports.AjoutCollaborateur = async (req, res) => {
  data = req.body

  var conditions = {
    _id: new ObjectID(data.id_groupe),
    'membres.id_user': { $ne: new ObjectID(data.usernameCollaborateur) }
};

var update = {
    $push: { membres: { id_user: new ObjectID(data.usernameCollaborateur)}}
}

Groupe.findOneAndUpdate(conditions, update, function(err, docs) {
   
});

}

module.exports.deleteCollabGroupe = async (req, res) => {
  data = req.body


 Groupe.update({ _id: new ObjectID(data.id_groupe) }, { "$pull": { "membres": { "id_user": new ObjectID(data.id_collaborateur) } }}, { safe: true, multi:true }, function(err, docs) {
 
  res.status(200).send(docs)
});
}

module.exports.ListCorrection = async (req, res) => {

  Historiquequizz.find({},{},function(err,docs) {
 
    let allQuizz = []

    for (let i = 0; i < docs.length; i++) {
      if(Object.values(allQuizz).indexOf(docs[i].id_quizz.titre) > -1)  
      {  
          
      }   
      else  
      {
        allQuizz.push(docs[i].id_quizz.titre)
      }  
    }
    res.send(allQuizz)
  }).populate('id_quizz');

}


module.exports.CorrectionID = async (req, res) => {
 
    
    Quizz.find({titre : req.params.titre_quizz},{},function(err,docs) {
      
      if (docs.length == 0) {

      }else{
        Historiquequizz.aggregate([{
          $match: {
            id_quizz: new ObjectID(docs[0]._id)
          }
        },
        {
          "$match": {
            "reponse": {
              "$elemMatch": { 
                "$and": [{
                  "corriger": false
                }, ]
              }
            },
          }
        }
        ], {}, function (err, docs1) {
        
          Historiquequizz.populate(docs1, {
            path: "id_collaborateur"
          }, function (err, docs2) {

            res.send(docs2)
          });
        // if (docs.length == 0) {
        
        
        // } else {
        
        // }
        });
      }
    });
}

module.exports.CorrectionID_correction = async (req, res) => {
  let data = req.params


Historiquequizz.find({ 'reponse.corriger': false , 'reponse.QCM': false , _id : data.id_listequestion} ,{},function(err,docs) {
    
    let questionAcorriger = []
    
    for (let i = 0; i < docs[0].reponse.length; i++) {
      
      
      if(docs[0].reponse[i].QCM == false){
        if(docs[0].reponse[i].corriger == false){
          let obj = {}
          obj.id_reponse = docs[0].reponse[i].id
          obj.question = docs[0].reponse[i].id_question.question 
          obj.reponse = docs[0].reponse[i].reponse_eleve
          // questionAcorriger[i] = obj
          questionAcorriger.push(obj)
        }
      } 
      
    }
res.send(questionAcorriger)
  }).populate('reponse.id_question');
  
} 


module.exports.correction_reponselibre = async (req, res) => {

let data = req.body

  for (let i = 0; i < data.length; i++) {

    if(data[i].resultat == undefined){ // si la question n'a pas ete corrigée --> faire : rien 
      
    }else{ // si elle a ete corrigée, changer le boolean dans la bdd
      Historiquequizz.update({
        'reponse._id': new ObjectID(data[i].id_reponse),
      }, {
        '$set': {
          'reponse.$.corriger': true,
          'reponse.$.bonne_reponse': data[i].resultat,
        }
      },
      function (err, succes) { 
        if (err) {
          console.log(err);
          
        }
          console.log(succes)
      });

    }
  }
  
}



module.exports.getcategoriecible = async (req, res) => {

  Categorie.find({_id:req.params.id_categorie},{},function(err,docs) {
    if (docs == 0) {
      res.send('')
  }else{
    res.send(docs);
  }
 
  });
}


module.exports.SendUpdatecategorie = async (req, res) => {

  let data = req.body
  let id_categorie = req.params.id_categorie

  Categorie.updateOne({_id:new ObjectID(id_categorie)},
  {$set:{
        titre : data.nom_categorie,
          }},function(err,docs) {
    res.status(200).send(docs)
  });

}

module.exports.getquizzcible = async (req, res) => {

  Quizz.find({_id:req.params.id_quizz},{},function(err,docs) { 
    if (docs == 0) {
      res.send('')
  }else{
    res.send(docs); 
  }
 
  });
}

module.exports.SendUpdatequizz = async (req, res) => {

  let data = req.body
  let id_quizz = req.params.id_quizz


  Quizz.updateOne({_id:new ObjectID(id_quizz)},
  {$set:{
        titre : data.nom_quizz,
          }},function(err,docs) {
    res.status(200).send(docs)
  });

}

module.exports.creation_utilisateur = async (req, res) => {

  let data = req.body

  bcrypt.hash(data.password.trim(), 10)
  .then(hash => {
    const user = new User({
      username: data.username.trim(),
      prenom: data.prenom.trim(),
      nom: data.nom.trim(),
      password: hash  ,
      type_de_compte: 'collaborateur'
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));

}


module.exports.Evaluateur_Statistique = async (req, res) => {
 
  Historiquequizz.aggregate([{
    $match: {}
  },
  {
    "$match": {
      "reponse": {
        "$elemMatch": {
          "$and": [{
            "corriger": true
          }, ]
        }
      },
    }
  }
], {}, function (err, docs) {


let nombre_quizz_corriger = 0
for (let i = 0; i < docs.length; i++) {
  nombre_quizz_corriger += 1
}

let data = {
  'nombre_quizz_corriger' : nombre_quizz_corriger
}
res.send(data)
console.log(nombre_quizz_corriger)
});

}


module.exports.getQuestionSugg = async (req, res) => {
 
  Question_suggerer.find({},{},function(err,docs) {
    if (docs.length == 0) {
      res.status(301).send('')
  }else{
    res.send(docs);
  }
  });

}

module.exports.deleteQuestionsSugg = async (req, res) => {
 
  let data = req.body

  Question_suggerer.deleteOne({ _id: data.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

}


module.exports.test = async (req, res) => {
 
  bcrypt.hash('collab', 10)
  .then(hash => {
    const user = new User({
      username: 'collab',
      prenom: 'Mustapha',
      nom: 'Salmi',
      password: hash  ,
      type_de_compte: 'collaborateur'
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));

}



