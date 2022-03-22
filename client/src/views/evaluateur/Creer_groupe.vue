<template>
  <div class="allcontenue">
    <h1> CREER GROUPE </h1>
    <div>
      <br>
      <span>Nom du Groupe : </span>
      <input type="text" v-model="nom_du_groupe"> <br>

      <button @click="creategroupe()"> Creation du groupe</button>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {

    data() {
      return {
        nom_du_groupe: ''
      }
    },
    beforeMount() {

    },
    methods: {
      async creategroupe() {

        const data = {
          "nom_du_groupe": this.nom_du_groupe
        };

        axios.post('http://10.0.52.54:3000/Creer_groupe', data)

        window.history.back();

      }
    }
  };
</script>