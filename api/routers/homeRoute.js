const { Router } = require('express');
const Question = require("../models/Question");
const Quizz = require("../models/Quizz");

const router = Router();


//////////////////// Authentification Controllers ////////////////////
const AuthentificationControler = require('../controllers/AuthentificationControler');

// GET 
router.get('/listuser', AuthentificationControler.ListUser);

//POST
router.post('/auth', AuthentificationControler.auth);



//////////////////// Collaborateur Controllers ////////////////////
const CollaborateurControler = require('../controllers/CollaborateurControler');

// GET 
router.get('/repondre_au_question', CollaborateurControler.randomQuestion);
router.get('/test', CollaborateurControler.test);
router.get('/Collaborateur_Statistique/:id_user', CollaborateurControler.Collaborateur_Statistique);

//POST
router.post('/envoiecode/:code/:Userid', CollaborateurControler.envoiecode);
router.post('/collab/Checklist/:code', CollaborateurControler.Checklist);
router.post('/collab/StartQuizz/:code', CollaborateurControler.StartQuizz);
router.post('/collab/envoie_reponse/:code', CollaborateurControler.envoie_reponse);
router.post('/collab/envoie_reponselibre/:code', CollaborateurControler.envoie_reponselibre);
router.post('/collab/HistoryQuizz/', CollaborateurControler.ListHistoryQuizz);
router.post('/collab/HistoryQuizz/Quizz', CollaborateurControler.HistoriqueDetails);
router.post('/collab/envoieQuestionsSuggerer', CollaborateurControler.envoieQuestionsSuggerer);

//////////////////// Evaluateur Controllers ////////////////////
const EvaluateurControler = require('../controllers/EvaluateurControler');

// GET 
router.get('/eval/', EvaluateurControler.Codeactif);
router.get('/quizz/:id', EvaluateurControler.Quizz);
router.get('/categorie', EvaluateurControler.categorie);
router.get('/groupe', EvaluateurControler.Groupe);
router.get('/groupe/:id', EvaluateurControler.GroupeID);
router.get('/question/:id', EvaluateurControler.Question);
router.get('/teste', EvaluateurControler.test);
router.get('/Updatequestion/:id', EvaluateurControler.getquestioncible);
router.get('/UpdateCategorie/:id_categorie', EvaluateurControler.getcategoriecible);
router.get('/UpdateQuizz/:id_quizz', EvaluateurControler.getquizzcible);

router.get('/listCollaborateur', EvaluateurControler.listCollaborateur);
router.get('/ListCorrection', EvaluateurControler.ListCorrection);
router.get('/CorrectionID/:titre_quizz', EvaluateurControler.CorrectionID);
router.get('/CorrectionID/correction/:titre_quizz/:id_listequestion', EvaluateurControler.CorrectionID_correction);
router.get('/Evaluateur_Statistique', EvaluateurControler.Evaluateur_Statistique);
router.get('/getQuestionSugg', EvaluateurControler.getQuestionSugg);


//POST
router.post('/Creer_qcm/:id', EvaluateurControler.creer_question);
router.post('/creer_categorie', EvaluateurControler.creer_categorie);
router.post('/Creer_groupe', EvaluateurControler.creer_groupe);
router.post('/Creer_quizz/:id', EvaluateurControler.creer_quizz);
router.post('/SendUpdatequestion/:id', EvaluateurControler.SendUpdatequestion);
router.post('/SendUpdatecategorie/:id_categorie', EvaluateurControler.SendUpdatecategorie);
router.post('/SendUpdatequizz/:id_quizz', EvaluateurControler.SendUpdatequizz);

router.post('/delete_question/:id', EvaluateurControler.delete_question);
router.post('/delete_categorie/:id', EvaluateurControler.delete_categorie);
router.post('/delete_quizz/:id', EvaluateurControler.delete_quizz);
router.post('/delete_groupe/:id', EvaluateurControler.delete_groupe);
router.post('/generecode/:id', EvaluateurControler.generecode);
router.post('/evaluateur/AjoutCollaborateur', EvaluateurControler.AjoutCollaborateur);
router.post('/evaluateur/deleteCollabGroupe', EvaluateurControler.deleteCollabGroupe);
router.post('/correction/reponselibre/:id_listequestion', EvaluateurControler.correction_reponselibre);
router.post('/evaluateur/creation_utilisateur', EvaluateurControler.creation_utilisateur);
router.post('/deleteQuestionsSugg', EvaluateurControler.deleteQuestionsSugg);






module.exports = router;
