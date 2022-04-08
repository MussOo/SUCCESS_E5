<template>
  <div class="allcontenue">
    <h2>STATISTIQUE</h2>
    <div v-for="d in stat" :key="d" class="box_black_center">
      <H2>Nombre de quizz passés</H2>
      <h3>{{d.nombre_quizz_passe}}</h3>
    </div>
    <div v-for="d in stat" :key="d" class="box_black_center">
      <H2>Taux de bonne reponse sur toute les questions</H2>
      <h3>{{d.pourcentage_reussite}} %</h3>
    </div>
  </div>
</template>



<script>
  // import axios from 'axios';
  export default {
    data: function () {
      return {
        stat: '',
      }
    },
    beforeMount() {
      this.statistique();
    },
    methods: {
      async statistique() {

        const res = await fetch('http://10.0.52.54:3000/Collaborateur_Statistique/' + localStorage.UserID + '');
        const data = await res.json();
        this.stat = data;


      }
    }
  }
</script>