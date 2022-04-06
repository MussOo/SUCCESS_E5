<template>
  <div class="allcontenue">
    <div v-for="d in question" :key="d">
      <h1>{{d.titre}}</h1>
    </div>
    <div>
      <div>
        <div v-for="d in question" :key="d" class="sous-allcontenu">
          <div v-for="question in d.question_id" :key="question" class="box_black_center">
            <span> question : </span>{{question.question}} <br>
            <span> point : </span>{{question.point}} <br>
            <span> temps : </span>{{question.time}} seconds<br> <br>

            <span> propostion :</span>
            <div v-for="n in question.proposition" :key="n">
              {{ n }}
            </div> <br>

            <span> bonne reponse :</span>
            <div v-for="n in question.bonne_reponse" :key="n">
              {{ n }}
            </div> <br>

            <div>
              <a @click="deletequestion(question._id)">Supprimer</a> <br>
              <a @click="$router.push('/Updatequestion/' + question._id +'')">Modifier</a>
            </div>
          </div>
        </div>
        <div class="bloc-quizz">

          <button @click="$router.push('/Creer_qcm/' + this.$route.params.id +'')"><img
              src="https://img.icons8.com/emoji/48/000000/plus-emoji.png" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    data() {

      return {
        question: Object(),
        lenght_proposition: String,
        n: 0,
      }
    },
    beforeMount() {
      this.showquestion();
    },
    methods: {

      async showquestion() {

        const res = await fetch('http://localhost:3000/question/' + this.$route.params.id + '');
        const data = await res.json();
        this.question = data;
      },
      async deletequestion(id) {
        const data = {
          "id_quizz": this.$route.params.id
        };
        axios.post('http://localhost:3000/delete_question/' + id + '', data)
        location.reload();
      }
    }
  };
</script>