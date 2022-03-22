
<template>
<div class="wrapper">
    <div class="sidebar">
        <h2>evaluateur</h2>
            <button @click="deconnexion()">deconnexion</button><br> <br>
        <ul>
          
            <li><a href="/"><i class="fas fa-home"></i>accueil</a></li> <br><br>
            <li><a href="/categorie"><i class="fas fa-user"></i>Les CATEGORIE</a></li><br><br>
            <li><a href="/groupe"><i class="fas fa-user"></i>LES GROUPES</a></li><br><br>
            <li><a href="/questions_proposees"><i class="fas fa-user"></i>Questions proposées</a></li><br><br>
            <li><a href="/Correction"><i class="fas fa-user"></i>CORRECTION</a></li><br><br>
            <li><a href="/creer_utilisateur"><i class="fas fa-user"></i>CREATION DE COMPTE COLLABORATEUR</a></li><br><br>
            <li><a href="/Statistique"><i class="fas fa-user"></i>STATISTIQUE</a></li><br><br>

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