<template>
  <div id="app">

    <!--NavBar-->
    <div>
      <b-navbar type="dark" id="barraNavegacion">
        <b-navbar-nav>
          <b-nav-item href="#"> <img id="imagenLogo" src="../src/assets/corporativos-uandes.webp"> </b-nav-item>
          <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/about">Nosotros</router-link></b-nav-item> 
        <b-nav-item href="#"><router-link to="/administracion">Administración</router-link></b-nav-item>         
        </b-navbar-nav>
      </b-navbar>
    </div>


    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default{
  name:'',
  data(){
    return{

    }
  },
  props:{},
  components:{},
  methods:{
    ...mapActions('InfoCursos', ['consultarCursos', 'consultarDatosTabla']),
  },
  computed:{},
  watch:{},
  beforeMount(){
    this.consultarCursos();
    this.consultarDatosTabla();
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #707070;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #950000;
  text-decoration: underline;
}

#imagenLogo{
  width: 10em;
}

#barraNavegacion{
  background-color: rgb(191, 188, 188);
}
</style>
