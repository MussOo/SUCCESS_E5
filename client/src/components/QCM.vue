<template>
    <div class="allcontenue">
        <h1>QCM</h1>
        <div class="commencer">
            <span>time : {{question.time}} second | point : {{question.point}}</span> <br><br>
            <span>Question :</span>
            <h4>{{question.question}}</h4> <br>
            <div v-for="(proposition,k) in question.proposition" :key="k">
                <div>{{proposition}}</div> <input type="checkbox" id="checkbox" @click="addBR(k)">
            </div>
        </div>

        <div id="buttonsuivant">
            <button @click="envoie_reponse(), StartQuizz()">suivante</button>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'QCM',
        props: {
        question: Object
        },
        data() {
            return {
                quizz: Object,
                vue_question: Boolean,
                reponse: [

                ],
                q:Object
            }
        },
        beforeMount() {
            
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
      async StartQuizz() {

        const data = {
          "Userid": localStorage.UserID,
        };

        axios.post('http://localhost:3000/collab/StartQuizz/' + this.$route.params.id + '', data)
          .then(response => (this.q = response.data))
          .then(function (response) {
            // handle error

            if(response.QCM){
              
              document.getElementById("QCM").style.display = "block";
              document.getElementById("QL").style.display = "none";
              document.getElementById("dd").style.display = "none";
            }else{
              
              document.getElementById("QL").style.display = "block";
              document.getElementById("QCM").style.display = "none";
              document.getElementById("dd").style.display = "none";
            }
            
            

          })
          .catch(function () {
            // handle error
            document.getElementById("AllQuizz").style.display = "none";
            document.getElementById("dd").style.display = "block";
            


          })

      },
            async envoie_reponse() {

                const data = {
                    "Userid": localStorage.UserID,
                    "reponse": this.reponse,
                    'id_question': this.question.id_question
                };

                axios.post('http://localhost:3000/collab/envoie_reponse/' + this.$route.params.id + '', data)
                    .then(function () {
                        // handle error
                    })
                this.StartQuizz()
            }
        },
    }
</script>