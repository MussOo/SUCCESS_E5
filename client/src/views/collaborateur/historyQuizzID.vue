<template>
  <div class="allcontenue">
    <h1>Historique des Quizz</h1>

    <div class="">
      <div class="contenue_tableau">
        <div>
          <div> <span>BONNE REPONSE :</span><img src="https://img.icons8.com/emoji/48/000000/green-square-emoji.png"/></div>
          <div> <span>MAUVAISE REPONSE :</span><img src="https://img.icons8.com/emoji/48/000000/red-square-emoji.png"/></div> <br>
          <div> <span>ATTENTE DE RESULTAT :  GRIS</span></div> 
        </div> <br> <br>
        <table id="table">
          <thead>
            <tr>
              <th colspan="3"> QUESTIONS </th>
            </tr>
            <tr>
              <td>question</td>
              <td>reponse(s) </td>
              <td>point</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in detailsHistorique" :key="b" :id="''+ b._id + ''" @click="test()">
              <td>{{b.id_question.question}}</td>
              <td>
                <div v-for="d in b.reponse_eleve" :key="d">{{d}}</div>
              </td>
              <td>{{b.point}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td> {{note}} / {{totalpoint}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        detailsHistorique: [],
        note: 0,
        totalpoint: 0,
        total: ""
      }
    },
    beforeMount() {
      this.detailsID()
    },
    methods: {
      async detailsID() {
        const data = {
          "Userid": localStorage.UserID,
          "id_listePasser": this.$route.params.listePasser,
        };

        await axios.post('http://10.0.52.54:3000/collab/HistoryQuizz/Quizz', data)
          .then(response => (this.detailsHistorique = response.data))
          .then(function (result) {

            console.log(result);

          })
          .catch(function (error) {

            console.log(error);

          })
        let cell = document.getElementById("table").getElementsByTagName("tr")

        for (let j = 0; j < this.detailsHistorique.length; j++) {
          this.totalpoint += this.detailsHistorique[j].point
          if (this.detailsHistorique[j].bonne_reponse) {
            this.note += this.detailsHistorique[j].point
          }

        }

        for (let i = 0; i < cell.length; i++) {

          let bonne_reponse = this.detailsHistorique[i].bonne_reponse
          let corriger = this.detailsHistorique[i].corriger
          if (corriger == false) {
            cell[i + 2].style.background = "grey"
          } else {
            if (bonne_reponse) {
              cell[i + 2].style.background = "#25BD13"
            } else {
              cell[i + 2].style.background = "#F43838"
            }
          }
        }


      }
    }
  }
</script>