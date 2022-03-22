<template>
    <div class="allcontenue">
        <h1>CORRECTION</h1>
        <div class="sous-allcontenu">
            <div v-for="d in Quizz" :key="d" class="box_black_center">
                {{d}} <br> <br>
                <button @click="$router.push('/CorrectionID/' + d +'')">A corriger</button>
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
            this.Correction()
        },
        methods: {
            async Correction() {
                const res = await fetch('http://10.0.52.54:3000/ListCorrection');
                const data = await res.json();
                this.Quizz = data;
      
            }

        }
    }
</script>