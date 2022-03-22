
<template>
<div class="wrapper">
    <div class="sidebar">
        <h2>collaborateur</h2>
        <button @click="deconnexion()">deconnexion</button><br> <br>
        <ul>
            <li><a href="/"><i class="fas fa-home"></i>accueil</a></li> <br><br>
            <li><a href="/historyquizz"><i class="fas fa-home"></i>Historique Quizz</a></li> <br><br>
            <li><a href="/Statistique"><i class="fas fa-home"></i>STATISTIQUE</a></li> <br><br>
            <li><a href="/Suggerer_des_questions"><i class="fas fa-home"></i>Suggérer des questions</a></li> <br><br>
            
        </ul> 
        <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
</div>
</template>


<script>
export default {
    name: 'navbar_evaluateur',
        methods: {
      deconnexion: function () {
        localStorage.clear();
        location.reload();
      }
    }
}
</script>