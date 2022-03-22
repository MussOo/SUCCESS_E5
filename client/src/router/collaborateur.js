import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/collaborateur/Accueil.vue'
import Quizz from '../views/collaborateur/Quizz.vue'
import historyQuizz from '../views/collaborateur/historyQuizz.vue'
import historyQuizzID from '../views/collaborateur/historyQuizzID.vue'
import Statistique from '../views/collaborateur/Statistique.vue'
import Suggerer_des_questions from '../views/collaborateur/Suggerer_des_questions.vue'


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/quizz/:id',
    name: 'Quizz',
    component: Quizz
  },
  {
    path: '/historyquizz',
    name: 'historyQuizz',
    component: historyQuizz
  },
  {
    path: '/history/quizz/:listePasser',
    name: 'historyQuizzID',
    component: historyQuizzID
  },
  {
    path: '/Statistique',
    name: 'Statistique',
    component: Statistique
  },
  {
    path: '/Suggerer_des_questions',
    name: 'Suggerer_des_questions',
    component: Suggerer_des_questions
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
