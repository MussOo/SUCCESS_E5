<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/lion.png">
    <Login msg="Portail Authentification"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  components: {
    Login
  }
}
</script>
