<template>
    <div class="allcontenue">
        <h1> Creation d'utilisateur </h1>

        <form action="">

            <div>
                <span>Nom</span>
                <input type="text" name="" id="" v-model="nom">
                <span>Prenom</span>
                <input type="text" name="" id="" v-model="prenom">
            </div>
            <div>
                <span>Username</span>
                <input type="text" name="" id="" v-model="username">
            </div>
            <div>
                <span>Password</span>
                <input type="text" name="" id="" v-model="password">
            </div>
        </form>
        <button @click="EnvoieUser()"> Envoie de la Question</button>
    </div>
</template>


<script>
    import axios from 'axios';

    export default {

        data() {
            return {
                nom: '',
                prenom: '',
                username: '',
                password: ''
            }

        },
        beforeMount() {

        },
        methods: {
            async EnvoieUser() {


                const data = {
                    'nom': this.nom,
                    'prenom': this.prenom,
                    'username': this.username,
                    'password': this.password
                };

                axios.post('http://localhost:3000/evaluateur/creation_utilisateur',
                        data)
                    .then(function () {

                        window.history.back();

                    })


            }
        }

    }
</script>