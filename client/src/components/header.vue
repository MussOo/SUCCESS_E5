<template>
<div class="header_account">
    <H1>{{Header}}</H1>
</div>
</template>

<script>
  // import axios from 'axios';
  export default {
    data: function () {
      return {
        Header: ''
      }
    },
    beforeMount() {
      this.header()
    },
    methods: {
      async header() {
       if(localStorage.getItem("type_de_compte")){
           this.Header = localStorage.getItem("type_de_compte")
       }else{
           this.Header = 'SUCCESS'
       }
      }
    }
  }
</script>