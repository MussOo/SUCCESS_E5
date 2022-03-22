<template>
  <div class="allcontenue">
    <h1> MODIFICATION QUESTION </h1>

    <div v-for="d in questionUpdate" :key="d">
      <div>
        <span>Questions : </span>
        <input type="text" size="100" v-model="question"> ancienne valeur : {{d.question}} <br> <br>

        <span>Point : </span>
        <input type="number" size="100" v-model="point"> ancienne valeur : {{d.point}} <br>
        <span>temps (seconds) : </span>
        <input type="number" size="100" v-model="time"> ancienne valeur : {{d.time}}<br> <br>

        <table id="table">
          <thead>
            <tr>
              <th colspan="3"> ANCIENNE PROPOSITIONS </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in d.proposition" :key="b">
              <td>{{b}}</td>
            </tr>
          </tbody>
        </table> <br> <br>
        <div>
          <div class="form-group" v-for="(proposition,k) in propositions" :key="k">
            <input type="text" class="form-control" v-model="proposition.propal">
            <span>
              <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || ( !k && propositions.length > 1)"></i>
              <span> </span> <span> </span>
              <i class="fas fa-plus-circle" @click="add(k)" v-show="k == propositions.length-1"></i>
              <span> bonne reponse : </span>
              <input type="checkbox" name="propal" @click="addBR(k)">
            </span>
          </div>
        </div>
        <br> <br>
        <button @click="UpdateQuestion()"> Envoie de la Question</button>
        <button @click="test()"> Envoie de la Question</button>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {

    data() {
      return {
        questionUpdate: Object(),
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
      this.QuestionUpdate()
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
      async QuestionUpdate() {

        const res = await fetch('http://localhost:3000/Updatequestion/' + this.$route.params.id + '');
        const data = await res.json();
        this.questionUpdate = data;
        
      },
      async UpdateQuestion() {


        const data = {
          'question': this.question,
          'point': this.point,
          'time': this.time,
          'proposition': this.propositions,
          'bonne_reponse': this.bonne_reponse
        };

        axios.post('http://localhost:3000/SendUpdatequestion/' + this.$route.params.id + '', data)
          .then(function () {

            window.history.back();

          })


      }
    }

  }
</script>