<template>
  <div class="allcontenue">

    <div>
      <div class="sous-allcontenu">
        <div v-for="d in membres" :key="d" class="box_black_center">

          <span> Nom : </span>{{d.nom}} <br>
          <span>Prenom : </span>{{d.prenom}} <br> <br>
          <button @click="deleteCollabGroupe(d.id_collab)">Supprimer</button>

        </div> <br>
        <div class="bloc-quizz">
          <button @click="$router.push('/Ajout_membres/' + this.$route.params.id +'')"><img
              src="https://img.icons8.com/emoji/48/000000/plus-emoji.png" /></button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  // import axios from 'axios';
  import axios from 'axios';
  export default {

    data() {
      return {
        membres: ''
      }
    },
    beforeMount() {
      this.showmembres()
    },
    methods: {
      async showmembres() {

        const res = await fetch('http://localhost:3000/groupe/' + this.$route.params.id + '');
        const data = await res.json();
        this.membres = data;
      },
      async deleteCollabGroupe(id) {
        const data = {
          "id_collaborateur": id,
          'id_groupe': this.$route.params.id
        };

        axios.post('http://localhost:3000/evaluateur/deleteCollabGroupe', data)
          .then(function () {

            location.reload();

          })

      }
    }
  };
</script>