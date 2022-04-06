<template>
    <div class="allcontenue">
        <h1>Correction ID</h1>
        <div class="sous-allcontenu">
            <div>

                <table>
                    <thead>
                        <tr>
                            <td>QUESTION :</td>
                            <td>REPONSE :</td>
                            <td>VERDICT : </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="q in questionlibre" :key="q">
                            <td>{{q.question}}</td>
                            <td v-for="d in q.reponse" :key="d">{{d}}</td>
                            {{}}
                            <td> <span>VRAI : </span><input type="radio" :name="q.id_reponse"
                                    v-on:click="correction(q.id_reponse, true)" value="VRAI"> <br> FAUX : <input
                                    type="radio" :name="q.id_reponse" v-on:click="correction(q.id_reponse, false)"
                                    value="FAUX"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button v-on:click="envoieresultat()">ENVOYER</button>
    </div>
</template>



<script>
    import axios from 'axios';
    export default {
        data: function () {
            return {
                questionlibre: Object,
                reponse: ''
            }
        },
        beforeMount() {
            this.ListeCorrection();
        },
        methods: {
            async ListeCorrection() {
                const res = await fetch('http://localhost:3000/CorrectionID/correction/' + this.$route.params
                    .titre_quizz + '/' + this.$route.params.id_listequestion + '');
                const data = await res.json();
                this.questionlibre = data;
                this.reponse = data;
                
            },
            async correction(id_q, index) {

                for (let i = 0; i < this.reponse.length; i++) {
                    if (this.reponse[i].id_reponse == id_q) {
                        this.reponse[i].resultat = index
                    }
                }

            },
            async envoieresultat() {

                const data = this.reponse;

                axios.post('http://localhost:3000/correction/reponselibre/' + this.$route.params.id_listequestion +
                        '', data)
                    .then(function () {
                        console.log('envoyer')

                    })
                    .catch(function () {

                    })
                window.history.back();
            }
        }
    }
</script>