<template>
    <div class="allcontenue">
        <h1>GROUPES</h1>
        <div>
            <div>
                <div class="sous-allcontenu">
                    <div v-for="d in groupe" :key="d" class="box_black_center">

                        <span>Groupe : </span>{{d.nom_groupe}} <br> <br>
                        <button @click="$router.push('/groupe/' + d._id +'')">Ouvrir</button> <br>
                        <button @click="deleteGroupe(d._id)">Supprimer</button>

                    </div> <br>
                    <div class="bloc-quizz">
                        <button @click="$router.push('/Creer_groupe')"><img
                                src="https://img.icons8.com/emoji/48/000000/plus-emoji.png" /></button>
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
                groupe: ''
            }
        },
        beforeMount() {
            this.ListGroupe()
        },
        methods: {
            async ListGroupe() {
                const res = await fetch('http://10.0.52.54:3000/groupe');
                const data = await res.json();
                this.groupe = data;
            },
            async deleteGroupe(id) {

                const data = {
                    "id_groupe": id
                };

                axios.post('http://10.0.52.54:3000/evaluateur/deleteGroupe', data)


            }
        }
    };
</script>