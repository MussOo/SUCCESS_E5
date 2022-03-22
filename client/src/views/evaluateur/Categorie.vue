<template>
    <div class="allcontenue">
        <h1>CATEGORIE</h1>
 

                <div class="sous-allcontenu">
                    <div v-for="d in categorie" :key="d" class="box_black_center">

                        <span>titre : </span>{{d.titre}} <br> <br>
                        <button @click="$router.push('/quizz/' + d._id +'')">Quizz</button> <br>
                        <a @click="deletecategorie(d._id)">Supprimer</a>
                        <a @click="$router.push('/UpdateCategorie/' + d._id +'')">Modifier</a>
                    </div> <br>
                    <div class="bloc-quizz">

                        <button @click="$router.push('/Creer_categorie')"><img
                                src="https://img.icons8.com/emoji/48/000000/plus-emoji.png" /></button>
                    </div>
                    <div>

                    </div>
                </div>
            
     
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {

            return {
                categorie: Object(),
                lenght_proposition: String,
                n: 0,
            }
        },
        beforeMount() {
            this.showcategorie();
        },
        methods: {

            async showcategorie() {

                const res = await fetch('http://10.0.52.54:3000/categorie');
                const data = await res.json();
                this.categorie = data;
            },
            async deletecategorie(id) {
                const data = {};
                axios.post('http://10.0.52.54:3000/delete_categorie/' + id + '', data)
                location.reload();

            }
        }
    };
</script>