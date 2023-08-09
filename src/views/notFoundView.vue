<template>
    <div id="notFoundView">
      <h1 class="pt-5">Página no encontrada</h1>
      <b-button variant="primary">Volver a Home</b-button>    
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: 'notFoundView',
    props: {
      
    },
    data(){
      return{
        
      }
    },
    methods:{
      ...mapActions('InfoCursos', ['consultarCursos'])
    },
    computed:{
      ...mapState('InfoCursos', ['datos', 'cursos_no_terminados']),
    },
    created(){
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  img{
    height: 250px;
  }
  
  #listaComponent{
      background-color: blanchedalmond;
  }
  

  
  </style>
  