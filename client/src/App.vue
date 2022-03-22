<template>
  <div id="nav">
  <div ><headers/></div>
  <div v-if="navbar === 'evaluateur'"><evaluateur/></div>

  <div v-if="navbar === 'collaborateur'"><collaborateur/></div>
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src

import '../public/main.css';

import evaluateur from '@/components/navbar/navbar_evaluateur.vue'
import collaborateur from '@/components/navbar/navbar_collaborateur.vue'
import headers from '@/components/header.vue'

export default {
  components: {
    evaluateur,
    collaborateur,
    headers
  },
  data() {
    return {
      navbar: ''
    }
  },
  created: function() {
 
    if(localStorage.getItem("type_de_compte") === 'evaluateur'){
      
      
      this.navbar = 'evaluateur'
    }else if(localStorage.getItem("type_de_compte") === 'collaborateur'){

  let patch = window.location.pathname
   if(patch.includes('quizz') === true){
    this.navbar = ''
   }else{
  this.navbar = 'collaborateur'
   }


    }else{
      
      this.navbar = ''
    }
}
}

</script>




