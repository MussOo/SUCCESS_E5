<template>
  <div class="allcontenue">

    <div id="AllQuizz">
      <div id="QCM" style="display:none">
        <h1>QCM</h1>
        <div class="commencer">
          <span>time : {{question.time}} second | point : {{question.point}}</span> <br><br>
          <span>Question :</span>
          <h4>{{question.question}}</h4> <br>
          <div v-for="(proposition,k) in question.proposition" :key="k">
            
            <div>{{proposition}}</div> <input type="checkbox" id="checkbox" @click="addBR(k)">
          </div>
          <div id="buttonsuivant">
            <button @click="QuestionQCM()">suivante</button>
          </div>
        </div>
      </div>

      <div id="QL" style="display:none">
        <h1>QUESTION LIBRE</h1>
        <div class="commencer">
          <span>time : {{question.time}} second | point : {{question.point}}</span> <br><br>
          <span>Question :</span>
          <h4>{{question.question}}</h4> <br>
          <input type="text" v-model="reponse">
        </div>

        <div id="buttonsuivant">
          <button @click="Questionlibre()" >suivante</button>
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
        quizz: Object,
        question: Object,
        vue_question: Boolean,
        reponse: [

        ],
        count: 0
      }
    },
    beforeMount() {
      this.checkQuestions();
      this.StartQuizz();

    },
    methods: {
      addBR(index) {

        Array.prototype.remove = function () {
          var what, a = arguments,
            L = a.length,
            ax;
          while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
              this.splice(ax, 1);
            }
          }
          return this;
        };

        // si la proposition figure deja dans le tableau de bonne reponse alors enlever le de la liste
        if (this.reponse.indexOf(this.question.proposition[index]) !== -1) {
          // this.bonne_reponse.splice(index,1);
          this.reponse.remove(this.question.proposition[index]);
        } else { // si c'est la premiere fois, push vers le tableau bonne reponse
          this.reponse.push(this.question.proposition[index]);
        }

      },
      async checkQuestions(){
        
        console.log('test start quizz')
        const data = {
          "Userid": localStorage.UserID,
        };

        axios.post('http://localhost:3000/collab/checkQuestions/' + this.$route.params.id + '', data)
          .then(function (response) {

              if(response.data.message === 'QUESTION_PRESENTE'){
                console.log('QUESTION_PRESENTE')
                
              }

              if(response.data.message === 'PLUS_DE_QUESTION'){
                window.close();
              }
          
          })
          .catch(function (err) {
            // handle error
            console.log(err);
          })

      },
      async StartQuizz() {

        const data = {
          "Userid": localStorage.UserID,
        };

        axios.post('http://localhost:3000/collab/StartQuizz/' + this.$route.params.id + '', data)
          .then(response => (this.question = response.data))
          .then(function (response) {
              
              if (response.QCM) {
                
                document.getElementById("QCM").style.display = "block";
                document.getElementById("QL").style.display = "none";
              } else {
                
                document.getElementById("QL").style.display = "block";
                document.getElementById("QCM").style.display = "none";
                
              }
          
          })
          .catch(function (err) {
            // handle error
            document.getElementById("AllQuizz").style.display = "none";
            console.log(err);
          })

      },
      async QuestionQCM() {

        const data = {
          "Userid": localStorage.UserID,
          "reponse": this.reponse,
          'id_question': this.question.id_question
        };

        axios.post('http://localhost:3000/collab/envoie_reponse/' + this.$route.params.id + '', data)
          .then(function () {
            // handle error

              document.getElementById("checkbox").checked = false;
              location.reload();
           
          })

        this.reponse = []

      },
      async Questionlibre() {

        const data = {
          "Userid": localStorage.UserID,
          "reponse": this.reponse,
          'id_question': this.question.id_question
        };

        axios.post('http://localhost:3000/collab/envoie_reponselibre/' + this.$route.params.id + '', data)
          .then(function () {
              location.reload();
          })

        this.reponse = []
      }
    }
  };
</script>