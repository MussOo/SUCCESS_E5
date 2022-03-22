<template>
  <div class="allcontenue">
    <div class="sous-allcontenu-center">
      <div class="box_black_center">
        <div>
          <h2>Entrez le code de session :</h2>
        </div>
        <span>A quelle sujet ?? </span>
        <div><input type="text" id="sujet" size="100" v-model="sujet"></div>
        <span>La question suggerée :</span>
        <div><input type="text" id="question" size="50" v-model="question"></div>
        <button @click="envoie_questions()">Envoyer</button> <br>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data: function () {
      return {

        question : '',
        sujet : '',
        categorie : Object,
        MessageErreurCode : false
      }
    },  
    methods: {
      deconnexion: function () {
        localStorage.clear(); 
        location.reload();
      },
      getCategorie() {

       axios.get('http://10.0.52.54:3000/categorie')
       .then(response => (this.categorie = response.data))
          .then(function (response) {

              console.log(response);

          })
          .catch(function (err) {

            console.log(err);
            console.log('t')

          })
      },

      envoie_questions() {

        const data = {
            "question": this.question,
            "sujet": this.sujet
        };

        axios.post('http://10.0.52.54:3000/collab/envoieQuestionsSuggerer', data)
        .then(function () {

              document.getElementById('question').value = ''
              document.getElementById('sujet').value = ''

          })
      }
    }
  }
</script>