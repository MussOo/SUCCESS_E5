<template>
  <div class="allcontenue">
    <h1> CREER QUIZZ </h1>

    <div>
      <br>
      <span>Titre : </span>
      <input type="text" v-model="titre"> <span style="display:none" id="MessageErreur">QUIZZ DEJA EXISTANT !!! </span>
      <br>

      <button @click="createquizz()"> Creation du Quizz</button>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {

    data() {
      return {
        titre: ''
      }
    },
    beforeMount() {

    },
    methods: {
      async createquizz() {

        const data = {
          "titre": this.titre
        };

        axios.post('http://10.0.52.54:3000/Creer_quizz/' + this.$route.params.id + '', data)
          .then(function () {

            window.history.back();
          })
          .catch(function () {
            document.getElementById("MessageErreur").style.display = "block";
          })
      }
    }
  };
</script>