const Question = require("../models/Question");
const Quizz = require("../models/Quizz");
const Codeactif = require("../models/Codeactif");
const ListeQuestionPasser = require("../models/ListeQuestionPasser");
const Historiquequizz = require("../models/Historiquequizz");
const Question_suggerer = require("../models/Question_suggerer.js");
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const User = require("../models/User");

const mongoose = require('mongoose');
const {
  LoggerLevel
} = require("mongoose/node_modules/mongodb");
const { ObjectID } = require("bson");

  module.exports.randomQuestion = async (req, res) => {

    Question.aggregate([{
        $match: {
          passer: false
        }
      },
      {
        $sample: {
          size: 1
        }
      }
    ], function (error, docs) {
      if (error) {
        
      }



      function isObjEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) return false;
        }

        return true;
      }

      if (!isObjEmpty(docs)) {
        Question.updateOne({
            _id: docs[0]._id
          }, {
            $set: {
              passer: true
            }
          })
          .then(result => {
            
          })
          .catch(err => console.error(`Failed to add review: ${err}`));
        res.send(docs);
      } else {
        let data = []
        res.send(data);
      }
    }).limit(1);
  }


module.exports.envoiecode = async (req, res) => {

let UserID = req.params.Userid
  
Codeactif.find({
    code: req.params.code
  }, {}, function (err, docs) {
    
    if (docs.length == 0) {
      res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
    } else { 
    
      Historiquequizz.find({
        id_quizz: new ObjectID(docs[0].id_quizz) ,  id_collaborateur : new ObjectID(UserID)
      }, {}, function (err, docs1) {
         
        if (docs1.length == 0) {
          res.status(200).send(docs)
   
        } else {
          
          res.status(400).send('QUIZZ DEJA PASSE')
        }

      });

    }
  });


  // res.status(403).send('sa marche pas !!!!!!!!!')
}

module.exports.test = async (req, res) => {

  bcrypt.hash('admin', 10)
  .then(hash => {
    const user = new User({
      username: 'admin',
      prenom: 'lol',
      nom: 'lol',
      password: hash,
      type_de_compte: 'evaluateur'
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));

}



module.exports.Checklist = async (req, res) => {

  let code = req.params.code
  let USER_ID = req.body.Userid

  ListeQuestionPasser.find({
    code: req.params.code,
    id_collaborateur: USER_ID
  }, {}, function (err, docs) {

    if (docs.length == 0) {
      var QuestionSource
      var id_quizz

      function resolvedata() {
        return new Promise(resolve => {
          setTimeout(() => {
            Codeactif.find({
              code: req.params.code
            }, {}, function (err, docs) {

              if (docs.length == 0) {
                res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
              } else {

                Quizz.find({
                  _id: docs[0].id_quizz._id
                }, {}, function (err, docs1) {

                  if (docs.length == 0) {
                    res.status(403).send('Le code que vous avez saisie ne fonctionne pas')
                  } else {
                    QuestionSource = docs1[0].question_id
                    code = docs[0].code
                    id_quizz = docs1[0]._id
                    resolve([QuestionSource, id_quizz, code])
                  }
                }).populate('question_id');
              }
            }).populate('id_quizz');
          }, 1000);
        });
      }

      async function CreateListeQuestion() {
        var x = await resolvedata();

        QuestionSource = x[0]
        id_quizz = x[1]
        code = x[2]
        let tableauQuestion = []

        nombre_question = QuestionSource.length

        for (let i = 0; i < nombre_question; i++) {

          var obj = new Object();
          obj.id_question = new ObjectID(QuestionSource[i]._id);
          obj.passer = false;

          tableauQuestion.push(obj)
          var jsonString = JSON.stringify(obj);

        }


        const Questionss = new ListeQuestionPasser({
          id_collaborateur: req.body.Userid,
          id_quizz: id_quizz,
          code: code,
          question: tableauQuestion,
          reponse_eleve: []
        });

        Questionss.save(function (err, succes) {
          if (err) {
            res.status(400).json(err)
          }
          if (succes) {
            
            res.status(200).send(docs)
          }
        });

      }
      CreateListeQuestion();

    } else {
      res.status(200).send('ListeQuestionPasser deja creer')
    }
  });
}

module.exports.checkQuestions = async (req, res) => {
  let code = req.params.code
  let USER_ID = new ObjectID(req.body.Userid)

  ListeQuestionPasser.aggregate([{
    $match: {
      code: code,
      id_collaborateur: USER_ID
    }
  },
  {
    "$match": {
      "question": {
        "$elemMatch": {
          "$and": [{
            "passer": false
          }, ]
        }
      },
    }
  },
  {
    "$project": {
      "question": {
        "$filter": {
          "input": "$question",
          "as": "question",
          "cond": {
            "$and": [{
                "$eq": ["$$question.passer", false]
              },

            ]
          }
        }
      }
    }
  }
], {}, function (err, docs) {

  console.log(docs)
  if (docs.length == 0) {

    res.status(200).send({message : 'PLUS_DE_QUESTION'});
  }else{
    res.status(200).send({message : 'QUESTION_PRESENTE'});
  }
});

}
module.exports.StartQuizz = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.

  let code = req.params.code
  let USER_ID = new ObjectID(req.body.Userid)

  ListeQuestionPasser.aggregate([{
    $match: {
      code: code,
      id_collaborateur: USER_ID
    }
  },
  {
    "$match": {
      "question": {
        "$elemMatch": {
          "$and": [{
            "passer": false
          }, ]
        }
      },
    }
  },
  {
    "$project": {
      "question": {
        "$filter": {
          "input": "$question",
          "as": "question",
          "cond": {
            "$and": [{
                "$eq": ["$$question.passer", false]
              },

            ]
          }
        }
      }
    }
  }
], {}, function (err, docs) {

  
  if (docs.length == 0) {

  ListeQuestionPasser.find({code : code, id_collaborateur : USER_ID}, {}, function (err, docs1) {
    function isObjEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    }

    

    let allreponse = []
    let noteTotal = 0

    for (let i = 0; i < docs1[0].reponse_eleve.length; i++) { // Tant qu'il y a des reponses de l'eleve
      
      var obj= new Object();
      obj.reponse_eleve = docs1[0].reponse_eleve[i].reponse 

      if(isObjEmpty(docs1[0].reponse_eleve[i].reponse)){ // si la reponse est vide
        
      }else{
        if(docs1[0].reponse_eleve[i].reponse_libre === false){  // si c'est une question QCM a corriger tout de suite
// verifier si il existe une similaritude entre les reponses et la correction
          let intersection = docs1[0].reponse_eleve[i].id_question.bonne_reponse.filter(x => docs1[0].reponse_eleve[i].reponse.includes(x));

          let difference = docs1[0].reponse_eleve[i].reponse.filter(x => !docs1[0].reponse_eleve[i].id_question.bonne_reponse.includes(x));

          if(isObjEmpty(difference)){
          if(!isObjEmpty(intersection)){
            obj.id_question = new ObjectID(docs1[0].reponse_eleve[i].id_question._id)
            obj.point = docs1[0].reponse_eleve[i].id_question.point
            obj.QCM = true
            obj.bonne_reponse = true
            noteTotal += docs1[0].reponse_eleve[i].id_question.point
          }
          }else{
            obj.id_question = new ObjectID(docs1[0].reponse_eleve[i].id_question._id)
            obj.QCM = true
            obj.point = docs1[0].reponse_eleve[i].id_question.point
            obj.bonne_reponse = false
            noteTotal += docs1[0].reponse_eleve[i].id_question.point 
          }


        }else{ // sinon la reponse provient d'une question libre

          obj.id_question = new ObjectID(docs1[0].reponse_eleve[i].id_question._id)
          obj.point = docs1[0].reponse_eleve[i].id_question.point
          obj.QCM = false
          obj.bonne_reponse = false
          obj.corriger = false
          
        }
      }
      allreponse[i] = obj
    }

    const Historiquequizzz = new Historiquequizz({
      id_collaborateur: new ObjectID(docs1[0].id_collaborateur),
      id_quizz: new ObjectID(docs1[0].id_quizz),
      reponse : allreponse,
      note_total : noteTotal,
      Date :  new Date()
    });

    
  Historiquequizzz.save(function (err, succes) {
    if (err) {
    }
    if (succes) {
      
    } 
  }); 
  res.status(200).send({status: 300, message : 'FIN_QUIZZ'}); 

  }).populate('reponse_eleve.id_question'); 
  
  } else {
    ListeQuestionPasser.populate(docs, {
      path: "question.id_question"  
    }, function (err, docs1) {
      

       if(docs[0].question.length === 1){

        let random = Math.floor(Math.random() * docs[0].question.length)

        let question = docs[0].question[random].id_question.question
        let QCM = docs[0].question[random].id_question.QCM
        let point = docs[0].question[random].id_question.point
        let time = docs[0].question[random].id_question.time
        let proposition = docs[0].question[random].id_question.proposition
  
        question = {
          "id_question": docs[0].question[random].id_question._id,
          "question": question,
          "QCM": QCM,
          "point": point,
          "time": time,
          "proposition": proposition,
          "derniere": true
        }
        res.status(200).send(question); 
       }else{

        let random = Math.floor(Math.random() * docs[0].question.length)

        let question = docs[0].question[random].id_question.question
        let QCM = docs[0].question[random].id_question.QCM
        let point = docs[0].question[random].id_question.point
        let time = docs[0].question[random].id_question.time
        let proposition = docs[0].question[random].id_question.proposition
  
        question = {
          "id_question": docs[0].question[random].id_question._id,
          "question": question,
          "QCM": QCM,
          "point": point,
          "time": time,
          "proposition": proposition 
        }
        res.status(200).send(question); 

       }

      
    }); 
  }
});

}

module.exports.envoie_reponse = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.

  let code = req.params.code
  let USER_ID = req.body.Userid
  let id_questions = req.body.id_question
  let reponse = req.body.reponse


   // ajout des questions dans la Liste du collaborateur
async function setupenvoie(){

  ListeQuestionPasser.findOneAndUpdate({
    code: code,
    id_collaborateur: USER_ID
  }, {
    $push: {
      reponse_eleve: {
        "id_question": new ObjectID(id_questions),
        "reponse": reponse,
        "reponse_libre": false
      }
    }
  })
  .exec(function (err, succes) {
    res.status(200).send(succes)
  });

  ListeQuestionPasser.update({
    'question.id_question': id_questions,
    code: code,
    id_collaborateur: USER_ID
  }, {
    '$set': {
      'question.$.passer': true,
    }
  },
  function (err, model) {
    if (err) {
      
    }
    return model
  });

  
}

async function exec(){

  const data = await setupenvoie();

}

exec();

}


module.exports.envoie_reponselibre = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.

  let code = req.params.code
  let USER_ID = req.body.Userid
  let id_questions = req.body.id_question
  let reponse = req.body.reponse


  async function setupenvoie(){

    ListeQuestionPasser.findOneAndUpdate({
      code: code,
      id_collaborateur: USER_ID
    }, {
      $push: {
        reponse_eleve: {
          "id_question": new ObjectID(id_questions),
          "reponse": reponse,
          "reponse_libre": true
        }
      }
    })
    .exec(function (err, succes) {
     res.status(200).send(succes)
    });
  
    ListeQuestionPasser.update({
        'question.id_question': id_questions,
        code: code,
        id_collaborateur: USER_ID
      }, {
        '$set': {
          'question.$.passer': true,
        }
      },
      function (err, model) {
        if (err) {

        }
        return model
      });
  }

  async function exec(){
    
    const data = await setupenvoie(); 
 
  }

  exec()

}


module.exports.ListHistoryQuizz = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.

  let data = req.body

  

  Historiquequizz.find({id_collaborateur: data.Userid}, {}, function (err, docs) {
 
    if (docs.length == 0) {
      res.status(403).send('Aucun Quizz trouvés !!')
    } else {
      res.status(200).send(docs)
    }

  }).populate('id_quizz');

}


module.exports.Collaborateur_Statistique = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.

Historiquequizz.find({id_collaborateur: new ObjectID(req.params.id_user)}, {}, function (err, docs) {
let nombre_quizz_passe = 0 
let nombre_de_bonne_reponse = 0 
let nombre_de_toute_les_reponse= 0 

for (let i = 0; i < docs.length; i++) {

 nombre_quizz_passe += 1

 for (let j = 0; j < docs[i].reponse.length; j++) {
  nombre_de_toute_les_reponse += 1

    if(docs[i].reponse[j].bonne_reponse == true){
      nombre_de_bonne_reponse += 1
    }

 }
}

let pourcentage_reussite = 100 *  nombre_de_bonne_reponse / nombre_de_toute_les_reponse


let data = [
              { 
                "nombre_quizz_passe" : nombre_quizz_passe,
                "pourcentage_reussite" : pourcentage_reussite
              }
            ]

            res.send(data)
}).populate('reponse.id_question');


}


module.exports.HistoriqueDetails = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.
 
  let data = req.body

  Historiquequizz.find({id_collaborateur: data.Userid, _id : data.id_listePasser}, {}, function (err, docs) {

    if (docs.length == 0) { 
      res.status(403).send('Aucun Quizz trouvés !!')
    } else {
      res.status(200).send(docs[0].reponse)
    }

  }).populate('reponse.id_question');
}

module.exports.envoieQuestionsSuggerer = async (req, res) => { // trouve la liste existant pour un collaborateur , choisi et envoie une question aleatoire au client.
 
  let data = req.body

console.log(data)


const sugg = new Question_suggerer({
  question: data.question,
  sujet: data.sujet,
  Date: new Date()
});

sugg.save(function (err, succes) {
  if (err) {
    res.status(400).json(err)
  }
  if (succes) {
    
    res.status(200).send(succes)
  }
});


}

