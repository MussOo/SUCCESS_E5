<template>
  <div class="allcontenue">
    <h1> CREER CATEGORIE </h1>

    <div>
      <br>
      <span>Titre : </span>
      <input type="text" v-model="titre"> <br>

      <button @click="createcategorie()"> Creation de la CATEGORIE</button>
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
      async createcategorie() {

        const data = {
          "titre": this.titre
        };

        axios.post('http://10.0.52.54:3000/creer_categorie', data)

        window.history.back();

      }
    }
  };
</script>