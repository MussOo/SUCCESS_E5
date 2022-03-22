<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      <div v-if="error_auth">identifiant ou mot de passe incorrect</div>
      <div v-if="good_auth">Tout est correct ! Bienvenu</div>
      <span>username : </span>
      <input type="text" v-model="username"> <br> <br>
      <span>password : </span>
      <input type="text" v-model="pwd"> <br><br>
      <input type="button" value="connexion" @click="connexion()">
    </div>

    <div>
      <table>
        <tr><span> </span>
          <td>identifiant</td> <span> </span>
          <td>mot de passe</td><span> </span>
        </tr>
        <tr><span> </span>
          <td>admin</td><span> </span>
          <td>admin</td><span> </span>
        </tr>

        <tr><span> </span>
          <td>collab</td><span> </span>
          <td>collab</td><span> </span>
        </tr>

      </table>
    </div>
  </div>

</template>

<script>
  const axios = require('axios');
  export default {
    name: 'Login',
    props: {
      msg: String
    },
    data: function () {
      return {
        username: '',
        pwd: '',
        listuser: [],
        error_auth: false,
        good_auth: false,
      }
    },
    methods: {
      connexion: function () {

        const requestOpt = {
          method: "POST",
          body: JSON.stringify({
            "username": this.username,
            "password": this.pwd
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        };

        fetch("http://localhost:3000/auth", requestOpt)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            if (result == 'false') { // utilisateur non trouvé

              this.error_auth = true
              this.good_auth = false

            } else { // utilisateur trouvé

              this.good_auth = true
              this.error_auth = false
              setTimeout(function () {
                localStorage.type_de_compte = result.type_de_compte;
                localStorage.UserID = result.userId;
                location.reload();

              }, 2000);
            }
          })
          .catch((error) => {
            console.log("error", error);
          })
      }
    },
    mounted() {
      axios
        .get('http://localhost:3000/listuser')
        .then(response => (this.listuser = response.data))
    }
  }
</script>