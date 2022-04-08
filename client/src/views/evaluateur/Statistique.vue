<template>
  <div class="allcontenue">
    <h2>STATISTIQUE</h2>
    <div v-for="d in stat" :key="d" class="box_black_center">
      
      <H2>Nombre de quizz corrigés</H2>
      <h3>{{d}}</h3>
    </div>
  </div>
</template>



<script>
  // import axios from 'axios';
  export default {
    data: function () {
      return {
        stat : '',
      }
    },
    beforeMount() {
      this.statistique();
    },
    methods: {
      async statistique(){

          const res = await fetch('http://10.0.52.54:3000/Evaluateur_Statistique');
          const data = await res.json();
          this.stat = data;
          
      
      }
    }
  }
</script>