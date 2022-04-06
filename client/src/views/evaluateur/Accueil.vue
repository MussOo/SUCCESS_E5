<template>
  <div class="allcontenue">
    <h2>Code actif:</h2>
    <div class="sous-allcontenu">
      <div v-for="d in code" :key="d" class="box_black_center">
        <div>
          <span>CODE : {{d.code}}</span> <br>
          <span>QUIZZ : {{d.id_quizz.titre}}</span> <br>
          <span>ETAT : {{d.actif}}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  // import axios from 'axios';
  export default {
    data: function () {
      return {
        quizz: Object(),
        code: Object()
      }
    },
    beforeMount() {
      this.codeactif()
    },
    methods: {
      deconnexion: function () {
        localStorage.clear();
        location.reload();
      },
      async codeactif() {
        const res = await fetch('http://localhost:3000/eval/');
        const data = await res.json();
        this.code = data;
       
      }
    }
  }
</script>