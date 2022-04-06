<template>
  <div class="allcontenue">
    <h1> CREER QUESTION </h1>

    <div>
      <span>Questions : </span>
      <input type="text" size="100" v-model="question"> <br> <br>

      <span>Point : </span>
      <input type="number" size="100" v-model="point"> <br>
      <span>temps (seconds) : </span>
      <input type="number" size="100" v-model="time"> <br> <br>

      <div class="form-group" v-for="(proposition,k) in propositions" :key="k">
        <input type="text" class="form-control" v-model="proposition.propal">
        <span>
          <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || ( !k && propositions.length > 1)"></i>
          <i class="fas fa-plus-circle" @click="add(k)" v-show="k == propositions.length-1"></i>
          <span> bonne reponse : </span>
          <input type="checkbox" name="propal" @click="addBR(k)">
        </span>
      </div>
      <br> <br>
      <button @click="envoiequestion()"> Envoie de la Question</button>
    </div>

  </div>
</template>


<script>
  import axios from 'axios';
  export default {

    data() {
      return {
        titre: '',
        aide: '',
        question: '',
        point: '',
        time: '',
        propositions: [{
          propal: '',
        }],
        bonne_reponse: [

        ],
        nbrep: String,
        count: 0
      }
    },
    beforeMount() {

    },
    methods: {

      add() {
        this.propositions.push({
          propal: ''
        });
        this.count += 1

      },
      remove(index) {
        this.propositions.splice(index, 1);
        this.count -= 1
      },
      addBR(index) {

        Array.prototype.remove = function () {
          var what, a = arguments,
            L = a.length,
            ax;
          while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
              this.splice(ax, 1);
            }
          }
          return this;
        };

        // si la proposition figure deja dans le tableau de bonne reponse alors enlever le de la liste
        if (this.bonne_reponse.indexOf(this.propositions[index].propal) !== -1) {
          // this.bonne_reponse.splice(index,1);
          this.bonne_reponse.remove(this.propositions[index].propal);
        } else { // si c'est la premiere fois, push vers le tableau bonne reponse
          this.bonne_reponse.push(this.propositions[index].propal);
        }

      },
      async envoiequestion() {


        const data = {
          "titre": this.titre,
          "aide": this.aide,
          'question': this.question,
          'point': this.point,
          'time': this.time,
          'proposition': this.propositions,
          'bonne_reponse': this.bonne_reponse
        };

        axios.post('http://localhost:3000/Creer_qcm/' + this.$route.params.id + '', data)
        window.history.back();
      }
    }
  };
</script>