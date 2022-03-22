<template>
    <div class="allcontenue">
        <h1> MODIFICATION NOM DU QUIZZ </h1>

        <div v-for="d in quizz" :key="d">

            <input type="text" name="" id="" v-model="quizzUp"> <span>Ancien nom de categorie : {{d.titre}}</span>
        </div>

        <button @click="UpdateQuizz()"> ENVOYER </button>
    </div>
</template>


<script>
    import axios from 'axios';

    export default {

        data() {
            return {
                quizz: Object(),
                quizzUp: ''
            }

        },
        beforeMount() {
            this.QuizzUpdate();
        },
        methods: {

            async QuizzUpdate() {

                const res = await fetch('http://localhost:3000/UpdateQuizz/' + this.$route.params.id_quizz + '');
                const data = await res.json();
                this.quizz = data;
    
            },
            async UpdateQuizz() {


                const data = {
                    'nom_quizz': this.quizzUp,
                };

                axios.post('http://localhost:3000/SendUpdatequizz/' + this.$route.params.id_quizz + '', data)
                    .then(function () {

                        window.history.back();

                    })


            }
        }

    }
</script>