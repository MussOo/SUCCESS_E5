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
          <div id="buttonsuivant" v-show="question.derniere === undefined">
            <button @click="QuestionQCM() && StartQuizz();">suivante</button>
          </div>
          <div id="buttonquestionderniere" v-show="question.derniere === true">
            <button @click="QuestionQCM() && CLOSE_PAGE()">VALIDER</button>
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

        <div id="buttonsuivant" v-show="question.derniere === undefined">
          <button @click="Questionlibre() && StartQuizz();" >suivante</button>
        </div>
        <div id="buttonquestiondernierelibre" v-show="question.derniere === true">
            <button @click="Questionlibre() && CLOSE_PAGE()" >VALIDER</button>
        </div>
      </div>
      <div>
        <button @click="StartQuizz()" id="buttonCOMMENCER" style="display:none">COMMENCER</button>
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
      this.Checklist()

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
      async Checklist() {

        const data = {
          "Userid": localStorage.UserID,
        };

        axios.post('http://localhost:3000/collab/Checklist/' + this.$route.params.id + '', data)
          .then(function () {
            document.getElementById("buttonCOMMENCER").style.display = "block"
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })


      },
      async StartQuizz() {

        const data = {
          "Userid": localStorage.UserID,
        };

        axios.post('http://localhost:3000/collab/StartQuizz/' + this.$route.params.id + '', data)
          .then(response => (this.question = response.data))
          .then(function (response) {
            
            if (response.message === 'FIN_QUIZZ') {
              window.close();
              document.getElementById("QL").style.display = "none";
              document.getElementById("QCM").style.display = "none";
            } else {
              if (response.QCM) {
                
                document.getElementById("QCM").style.display = "block";
                document.getElementById("QL").style.display = "none";
                document.getElementById("checkbox").checked = false;
                document.getElementById("buttonCOMMENCER").style.display = "none"
              } else {
                
                document.getElementById("QL").style.display = "block";
                document.getElementById("QCM").style.display = "none";
                document.getElementById("buttonCOMMENCER").style.display = "none"
                
              }
            }

            if(response.derniere === true){
              if (response.QCM) {
                document.getElementById("buttonquestionderniere").style.display = "block";
                document.getElementById("buttonquestiondernierelibre").style.display = "none";
                document.getElementById("buttonCOMMENCER").style.display = "none";
                document.getElementById("buttonsuivant").style.display = "none";
                
                
              } else {
                document.getElementById("buttonquestiondernierelibre").style.display = "block";
                document.getElementById("buttonquestionderniere").style.display = "none";
                document.getElementById("buttonCOMMENCER").style.display = "none";
                document.getElementById("buttonsuivant").style.display = "none";
              }
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
            document.getElementById("checkbox").checked = false;
          })

        this.reponse = []
      },
      async CLOSE_PAGE(){
        window.close();
      }
    }
  };
</script>