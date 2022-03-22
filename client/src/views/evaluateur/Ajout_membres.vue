<template>
    <div class="allcontenue">
        <h1>Ajout de Membre</h1>
        <div>
            <select v-model="CollaborateurChoisi">
                <option v-for="C in listC" :key="C" v-bind:value="C._id">
                    {{ C.nom }} | {{ C.prenom }}
                </option>
            </select><br>
            <button @click="envoieCollaborateur()">Ajouter</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                listC: Object,
                CollaborateurChoisi: '',
                options: [{
                        text: 'One',
                        value: 'A'
                    },
                    {
                        text: 'Two',
                        value: 'B'
                    },
                    {
                        text: 'Three',
                        value: 'C'
                    }
                ]
            }
        },
        beforeMount() {
            this.listCollaborateur();
        },
        methods: {
            async listCollaborateur() {
                const res = await fetch('http://10.0.52.54:3000/listCollaborateur');
                const data = await res.json();
                this.listC = data;
            },
            async envoieCollaborateur() {
                const data = {
                    "usernameCollaborateur": this.CollaborateurChoisi,
                    "id_groupe": this.$route.params.id
                };

                axios.post('http://10.0.52.54:3000/evaluateur/AjoutCollaborateur', data)

                window.history.back();
            }
        }
    };
</script>