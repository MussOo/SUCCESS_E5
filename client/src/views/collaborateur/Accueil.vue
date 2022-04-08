<template>
  <div class="allcontenue">
    <div class="sous-allcontenu-center">
      <div class="box_black_center">
        <div>
          <h2>Entrez le code de session :</h2>
        </div>
        <div><input type="text" v-model="codesession"></div>
        <button @click="envoiecode()">Rejoindre</button> <br>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data: function () {
      return {
        codesession : '',
        MessageErreurCode : false
      }
    },
    methods: {
      deconnexion: function () {
        localStorage.clear();
        location.reload();
      },
      envoiecode() {

       axios.post('http://10.0.52.54:3000/envoiecode/' + this.codesession + '/' + localStorage.UserID + '')
          .then(function (response) {

            const data = {
              "Userid": localStorage.UserID,
            };

          axios.post('http://10.0.52.54:3000/collab/Checklist/' + response.data[0].code + '', data)
          .then(function () {

          let url = window.location.protocol + "//" + window.location.host + window.location.pathname + 'quizz/';

            window.open(
            url + response.data[0].code + "",
            "DescriptiveWindowName",
            "resizable,scrollbars,status"
          )

          })

          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
  }
</script>