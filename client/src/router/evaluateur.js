import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/evaluateur/Accueil.vue'


import Categorie from '../views/evaluateur/Categorie.vue'
import Quizz from '../views/evaluateur/quizz.vue'
import Question from '../views/evaluateur/question.vue'

import Creer_qcm from '../views/evaluateur/creer_qcm.vue'
import Creer_quizz from '../views/evaluateur/creer_quizz.vue'
import Creer_categorie from '../views/evaluateur/Creer_categorie.vue'

import Updatequestion from '../views/evaluateur/updatequestion.vue'
import Groupe from '../views/evaluateur/groupe.vue'
import Creer_groupe from '../views/evaluateur/Creer_groupe.vue'
import GroupeID from '../views/evaluateur/GroupeID.vue'
import Ajout_membres from '../views/evaluateur/Ajout_membres.vue'
import Correction from '../views/evaluateur/Correction.vue'
import CorrectionID from '../views/evaluateur/CorrectionID.vue'
import CorrectionIDcorrection from '../views/evaluateur/CorrectionIDcorrection.vue'
import UpdateCategorie from '../views/evaluateur/UpdateCategorie.vue'
import UpdateQuizz from '../views/evaluateur/UpdateQuizz.vue'
import creer_utilisateur from '../views/evaluateur/creer_utilisateur.vue'
import Statistique from '../views/evaluateur/Statistique.vue'
import questions_proposees from '../views/evaluateur/questions_proposees.vue'
const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/Creer_qcm/:id',
    name: 'Creer_qcm',
    component: Creer_qcm
  },
  {
    path: '/categorie',
    name: 'Categorie',
    component: Categorie
  },
  {
    path: '/quizz/:id',
    name: 'Quizz',
    component: Quizz
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: Question
  },  
  {
    path: '/Updatequestion/:id',
    name: 'Updatequestion',
    component: Updatequestion
  },
  {
    path: '/Creer_quizz/:id',
    name: 'Creer_quizz',
    component: Creer_quizz
  },
  {
    path: '/Creer_categorie',
    name: 'Creer_categorie',
    component: Creer_categorie
  },
  {
    path: '/groupe',
    name: 'Groupe',
    component: Groupe
  },
  {
    path: '/groupe/:id',
    name: 'GroupeID',
    component: GroupeID
  },
  {
    path: '/Creer_groupe',
    name: 'Creer_groupe',
    component: Creer_groupe
  },
  {
    path: '/Ajout_membres/:id',
    name: 'Ajout_membres',
    component: Ajout_membres
  },
  {
    path: '/Correction',
    name: 'Correction',
    component: Correction
  },
  {
    path: '/CorrectionID/:titre_quizz',
    name: 'CorrectionID',
    component: CorrectionID
  },
    {
    path: '/CorrectionIDcorrection/:titre_quizz/:id_listequestion',
    name: 'CorrectionIDcorrection',
    component: CorrectionIDcorrection
  },
  {
    path: '/UpdateCategorie/:id_categorie',
    name: 'UpdateCategorie',
    component: UpdateCategorie
  },
  {
    path: '/UpdateQuizz/:id_quizz',
    name: 'UpdateQuizz',
    component: UpdateQuizz
  },
  {
    path: '/creer_utilisateur',
    name: 'creer_utilisateur',
    component: creer_utilisateur
  },
  {
    path: '/Statistique',
    name: 'Statistique',
    component: Statistique
  },
  {
    path: '/questions_proposees',
    name: 'questions_proposees',
    component: questions_proposees
  }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
