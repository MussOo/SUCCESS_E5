<template>
<div class="allcontenue">
    <h1>Historique des Quizz</h1>

        <div>
            <div class="sous-allcontenu">
                <div v-for="d in ListHistory" :key="d" class="box_black_center">
                <span>Quizz : </span>{{d.id_quizz.titre}}<br> <br>
                <button @click="$router.push('/history/quizz/' + d._id +'')">CLICK ME</button>
                </div> <br>
                <div>
                </div>
            </div>
        </div>
</div>
</template>


<script>
  import axios from 'axios';

  export default {

    data() {
      return {
          ListHistory : Object
      }
    },
    beforeMount() {
        this.ListQuizzPasser()
    },
    methods: {
        async ListQuizzPasser(){

            const data = {
            "Userid": localStorage.UserID,
            };

            axios.post('http://10.0.52.54:3000/collab/HistoryQuizz', data)
            .then(response => (this.ListHistory  = response.data))
            .catch(function (error) {

                console.log(error);
            }) 

        }
    }
  };
</script>