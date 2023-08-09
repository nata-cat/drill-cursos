<template>
  <div id="listaComponent">
    <h1 class="pt-5">{{ titulo }}</h1>
    
    <!--cards-->
    <div v-for="cursos in consultarNoCompletados" v-bind:key="cursos.id" class="repoCards">
  <b-card
    :title="cursos.nombre"
    :img-src="cursos.img"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem; min-height: 580px;"
    class="mb-2"
  >
    <b-card-text>
      <p>Duración: {{ cursos.duracion }}</p>
      <p>Disponible: <i v-if="cursos.completado" class="fa-solid fa-circle-xmark"></i> <i v-else class="fa-solid fa-circle-check"></i></p>

      <p>{{ cursos.descripcion}}</p>
    </b-card-text>

    <b-button v-if="cursos.completado" href="#" disabled>Ver curso</b-button> <b-button v-else href="#" variant="primary">Ver curso</b-button>
  </b-card>
</div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'listaComponent',
  props: {
    titulo: String
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
    ...mapGetters('InfoCursos', ['consultarNoCompletados'])
   
  },
  created(){
    //this.consultarCursos();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img{
  height: 250px;
}

#listaComponent{
    background-color: #f7f7f7}

.repoCards{
  display: inline-block;
  margin: 2%;
}

</style>
