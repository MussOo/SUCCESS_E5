<template>
    <div class="allcontenue">
        <h1>QUIZZ</h1>
        <div>
            <div>
                <div>
                    <div v-for="d in quizz" :key="d" class="sous-allcontenu">
                        <div v-for="b in d.quizz_id" :key="b" class="box_black_center">
                            <span>titre : </span>{{b.titre}} <br> <br>
                            <button @click="$router.push('/question/' + b._id +'')">Question</button> <br>
                            <button @click="GenereCode(b._id)">Générer Code</button> <br> <br>
                            <a @click="deletequizz(b._id)">Supprimer</a>
                            <a @click="$router.push('/UpdateQuizz/' + b._id +'')">Modifier</a>
                        </div>
                    </div>
                    <br>
                    <div class="bloc-quizz">
                        <button @click="$router.push('/Creer_quizz/' + this.$route.params.id +'')"><img
                                src="https://img.iconess8.com/emoji/48/000000/plus-emoji.png" /></button>
                    </div>
                    <div>
                    </div>
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
                quizz: Object(),
                lenght_proposition: String,
                n: 0,
            }
        },
        beforeMount() {
            this.showquizz();
        },
        methods: {

            async showquizz() {

                const res = await fetch('http://localhost:3000/quizz/' + this.$route.params.id + '');
                const data = await res.json();
                this.quizz = data;
                
            },
            async deletequizz(id) {
                const data = {};
                axios.post('http://localhost:3000/delete_quizz/' + id + '', data)
                location.reload();

            },
            async GenereCode(id) {
                const data = {};
                axios.post('http://localhost:3000/generecode/' + id + '', data)
                
            }
        }
    };
</script>