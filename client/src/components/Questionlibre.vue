<template>
    <div class="allcontenue">
        <h1>QUESTION LIBRE</h1>
        <div class="commencer">
            <span>time : {{question.time}} second | point : {{question.point}}</span> <br><br>
            <span>Question :</span>
            <h4>{{question.question}}</h4> <br>
            <input type="text" v-model="reponse">
        </div>

        <div id="buttonsuivant">
            <button @click="envoie_reponse()">suivante</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
    export default {
        name: 'Questionlibre',
        props: {
            question: Object
        },
        data() {
            return {
                reponse: ''
            }
        },
    methods: {
      async envoie_reponse() {

          const data = {
          "Userid": localStorage.UserID,
          "reponse": this.reponse,
          'id_question':this.question.id_question
        };

        axios.post('http://localhost:3000/collab/envoie_reponselibre/' + this.$route.params.id + '', data)
        .then(function () {
            // handle error
        })

      }
    }
    }
</script>