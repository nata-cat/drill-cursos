<template>
  <div id="homeView">

    <listaComponent titulo="Lista de cursos" />
  </div>
</template>

<script>
// @ is an alias to /src
import listaComponent from '@/components/listaComponent.vue'


export default {
  name: 'HomeView',
  components: {
    listaComponent
  },
  
}
</script>

<style scoped>
#homeView {
  background-color: #f5f5f5;
}


</style>