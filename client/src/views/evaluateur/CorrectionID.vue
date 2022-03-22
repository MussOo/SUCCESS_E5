<template>
    <div class="allcontenue">
        <h1>Correction ID</h1>
        <div class="sous-allcontenu">
            <div v-for="d in Quizz" :key="d" class="box_black_center">
                {{d.id_collaborateur.nom}} <br>
                {{d.id_collaborateur.prenom}} <br> <br>
                {{d.Date}} <br><br>
                <div class="bloc-quizz">
                    <button
                        @click="$router.push('/CorrectionIDcorrection/' + this.$route.params.titre_quizz +'/'+d._id )">
                        CORRIGER </button>
                </div>
            </div> <br>

        </div>
    </div>
</template>



<script>
    // import axios from 'axios';
    export default {
        data: function () {
            return {
                Quizz: Object
            }
        },
        beforeMount() {
            this.ListeCorrection()
        },
        methods: {
            async ListeCorrection() {
                const res = await fetch('http://localhost:3000/CorrectionID/' + this.$route.params.titre_quizz +
                '');
                const data = await res.json();
                this.Quizz = data;
                
            }

        }
    }
</script>