<template>
    <div id="totalesComponent">
        <h1 class="pt-5">Cifras totales:</h1>

        <b-list-group id="listaTotales" class="mb-5">
            <b-list-group-item class="d-flex justify-content-center align-items-center px-3" variant="primary">
                <i class="fa-regular fa-circle-check m-3"></i> Cantidad de alumnos permitidos:   <b class="ms-3"> {{ totalAlumnos }} personas </b>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-center align-items-center px-3" variant="warning">
                <i class="fa-regular fa-pen-to-square m-3"></i> Cantidad de alumnos inscritos: <b class="ms-3">{{ totalInscritos }} personas </b>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-center align-items-center  px-3" variant="info">
                <i class="fa-regular fa-rectangle-list m-3"></i> Cantidad de cupos restantes: <b class="ms-3">{{ totalCuposRestantes }} cupos </b>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-center align-items-center px-3" variant="danger">
                <i class="fa-regular fa-rectangle-xmark m-3"></i> Cantidad de cursos terminados: <b class="ms-3">{{ totalCursosTerminados }} cursos </b>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-center align-items-center px-3" variant="success">
                <i class="fa-regular fa-circle-play m-3"></i> Cantidad de cursos activos: <b class="ms-3">{{ totalCursosActivos }} cursos </b>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-center align-items-center px-3" variant="primary">
                <i class="fa-regular fa-clipboard m-3"></i> Cantidad total de cursos: <b class="ms-3">{{ totalCursos }} cursos </b>
            </b-list-group-item>

        </b-list-group>


    </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'totalesComponent',
    props: {

    },
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
        ...mapState('InfoCursos', ['datos_tabla']),

        totalAlumnos() {
            let valorInicial = 0;
            let total = this.datos_tabla.reduce((acumulador, registro) => acumulador + registro.cupos, valorInicial);
            return total;
        },
        totalInscritos() {
            let valorInicial = 0;
            let total = this.datos_tabla.reduce((acumulador, registro) => acumulador + registro.inscritos, valorInicial);
            return total;
        },
        totalCuposRestantes() {
            let valorInicial = 0;
            let totalCupos = this.datos_tabla.reduce((acumulador, registro) => acumulador + registro.cupos, valorInicial);
            let totalInscritos = this.datos_tabla.reduce((acumulador, registro) => acumulador + registro.inscritos, valorInicial);
            
            let diferencia =  totalCupos - totalInscritos;
            return diferencia;
        },
        totalCursosTerminados() {
            
            let totalTerminados = this.datos_tabla.filter(registro => registro.terminado === true);
            return totalTerminados.length;
        },
        totalCursosActivos() {
            
            let totalActivos = this.datos_tabla.filter(registro => registro.terminado === false);
            return totalActivos.length;
        },
        totalCursos() {
            let totalActivos = this.datos_tabla.length;
            return totalActivos;
        },



    },
    created() {
        //this.consultarDatosTabla();
        //this.consultarCursos();
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#totalesComponent {
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#listaTotales{
    width: 80%;
    font-size: 20px;
}
</style>
  