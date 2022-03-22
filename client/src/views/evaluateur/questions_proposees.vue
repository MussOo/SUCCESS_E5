<template>
    <div class="allcontenue">
        <h1>QUESTIONS PROPOSEES</h1>
        <div class="sous-allcontenu">
            <div v-for="d in question" :key="d" class="box_black_center">
                <span><strong> Le domaine :</strong></span>
                {{d.sujet}} <br> <br>
                <span><strong> La questions :</strong></span>
                {{d.question}} <br> <br>
                <button @click="this.DeleteQuestion(d._id)">Supprimer</button>
                
            </div> <br>
        </div>
    </div>
</template>



<script>
import axios from 'axios';
    export default {
        data: function () {
            return {
                question: Object
            }
        },
        beforeMount() {
            this.GetQuestions()
        },
        methods: {
            GetQuestions() {

            axios.get('http://localhost:3000/getQuestionSugg')
            .then(response => (this.question = response.data))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                })
            },
            DeleteQuestion(id){
                const data = {
                    "id": id
                };

                axios.post('http://localhost:3000/deleteQuestionsSugg', data)
                .then(function () {
                    location.reload();
                })
            }
        }
    }
</script>