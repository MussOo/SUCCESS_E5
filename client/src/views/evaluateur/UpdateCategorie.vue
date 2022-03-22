<template>
  <div class="allcontenue">
    <h1> MODIFICATION NOM DE CATEGORIE </h1>

    <div v-for="d in categorie" :key="d">

      <input type="text" name="" id="" v-model="categorieUp"> <span>Ancien nom de categorie : {{d.titre}}</span>
    </div>

    <button @click="UpdateCategorie()"> Envoie de la Question</button>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {

    data() {
      return {
        categorie: Object(),
        categorieUp: ''
      }

    },
    beforeMount() {
      this.CategorieUpdate();
    },
    methods: {

      async CategorieUpdate() {

        const res = await fetch('http://10.0.52.54:3000/UpdateCategorie/' + this.$route.params.id_categorie + '');
        const data = await res.json();
        this.categorie = data;
        
      },
      async UpdateCategorie() {


        const data = {
          'nom_categorie': this.categorieUp,
        };

        axios.post('http://10.0.52.54:3000/SendUpdatecategorie/' + this.$route.params.id_categorie + '', data)
          .then(function () {

            window.history.back();

          })


      }
    }

  }
</script>