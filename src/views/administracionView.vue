<template>
  <div id="adminView">
    <h1 class="pt-5">Administración de cursos</h1>
    <b-button variant="primary" @click="modalShow = !modalShow">Agregar Cursos</b-button>

    <tablaComponent></tablaComponent>
    <totalesComponent></totalesComponent>




    <div>
      <b-modal v-model="modalShow">

        <div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-nombre" label="Nombre del curso:" label-for="input-nombre"
              description="Ingrese el nombre del curso">
              <b-form-input id="input-nombre" v-model="form_tabla.curso"  placeholder="Ingrese nombre"
                required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-imagen" label="Imagen del curso:" label-for="input-group-2">
              <b-form-input id="input-imagen" v-model="form_tabla.img" placeholder="Ingrese url de imagen"
                required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-cupos" label="cupos para el curso:" label-for="input-cupos">
              <b-form-input id="input-cupos" v-model="form_tabla.cupos" type="number" placeholder="Ingrese cupos del curso"
                required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-inscritos" label="Cantidad de inscritos:" label-for="input-inscritos">
              <b-form-input id="input-inscritos" v-model="form_tabla.inscritos" type="number"
                placeholder="Ingrese la cantidad de inscritos en el curso" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-duracion" label="Ingrese la duración del curso:" label-for="input-duracion">
              <b-form-input id="input-duracion" v-model="form_tabla.duracion" placeholder="Ingrese la duracion del curso"
                required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-registro" label="Fecha de registro:" label-for="input-registo">
              <b-form-input id="input-registro" v-model="form_tabla.fecha" type="date"
                placeholder="Ingrese fecha de registro" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-costo" label="Valor del curso:" label-for="input-costo">
              <b-form-input id="input-costo" v-model="form_tabla.costo" type="number" placeholder="Ingrese valor del curso"
                required></b-form-input>
            </b-form-group> <br>

            <b-form-textarea id="textarea" v-model="form_tabla.descripcion" placeholder="Ingrese una descripción del curso:" rows="3"
              max-rows="6">
            </b-form-textarea> <br>
            




            <b-button type="submit" variant="primary">Agregar</b-button>
            <b-button type="reset" variant="danger">Limpiar todo</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form_tabla }}</pre>
          </b-card>
        </div>


      </b-modal>
    </div>


  </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import tablaComponent from '../components/tablaComponent.vue'
import totalesComponent from '@/components/totalesComponent.vue';

export default {
  name: 'adminView',
  props: {

  },
  components: {
    tablaComponent,
    totalesComponent
  },
  data() {
    return {
      modalShow: false,
      form_tabla: {
        id: '',
        curso: '',
        img: '',
        cupos: 0,
        costo: 0,
        duracion: '',
        inscritos: 0,
        terminado: false,
        fecha: '',
        descripcion: ''
      },
      form_cards: {
        id: '',
        nombre: '',
        img: '',
        cupos: 0,
        costo: 0,
        duracion: '',
        inscritos: 0,
        completado: false,
        fecha_registro: '',
        descripcion: ''
      },
      show: true
    }
  },
  methods: {
    ...mapActions('InfoCursos', ['consultarCursos', 'registrarDatosCards', 'registrarDatosTabla']),
    onSubmit(event) {
      event.preventDefault()

      if(this.form_tabla.inscritos > this.form_tabla.cupos){
        alert('La cantidad de inscritos no debe ser mayor a la cantidad de cupos. Confirme esta catidad y vuelva a intentar')
      }
      else{
        //Función para convertir a json con stringify
        //alert(JSON.stringify(this.form));

        let ultimoIndice = this.datos.length -1;
        let elIdUltimo = this.datos[ultimoIndice].id;
        let nuevoId = elIdUltimo + 1;

        this.form_tabla.id = nuevoId;

        this.form_cards.id = this.form_tabla.id;
        this.form_cards.nombre = this.form_tabla.curso;
        this.form_cards.img = this.form_tabla.img;
        this.form_cards.cupos = this.form_tabla.cupos;
        this.form_cards.duracion = this.form_tabla.duracion;
        this.form_cards.costo = this.form_tabla.costo;
        this.form_cards.inscritos = this.form_tabla.inscritos;
        this.form_cards.completado = this.form_tabla.terminado;
        this.form_cards.fecha_registro = this.form_tabla.fecha;
        this.form_cards.descripcion = this.form_tabla.descripcion;

        let dataCards = {...this.form_cards}
        let dataTabla = {...this.form_tabla}
        this.registrarDatosTabla(dataTabla);
        this.registrarDatosCards(dataCards);
      }
      
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
        this.form_tabla.curso = '',
        this.form_tabla.img = '',
        this.form_tabla.cupos = 0,
        this.form_tabla.costo = 0,
        this.form_tabla.duracion= '',
        this.form_tabla.inscritos= 0,
        this.form_tabla.terminado= false,
        this.form_tabla.fecha= '',
        this.form_tabla.descripcion= ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
  computed: {
    ...mapState('InfoCursos', ['datos', 'cursos_no_terminados']),
  },
  created() {
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 250px;
}

#listaComponent {
  background-color: #f3f3f3f3;
}
</style>
  