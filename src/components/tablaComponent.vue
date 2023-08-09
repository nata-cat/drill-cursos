<template>
    <div id="tablaComponent">
        <h3 class="pt-5">Listado de cursos</h3>

        <div id="laTabla">
            <table>

                <tr>
                    <th>ID</th>
                    <th>Curso</th>
                    <th>Cupos</th>
                    <th>Inscritos</th>
                    <th>Duración</th>
                    <th>Costo</th>
                    <th>Terminado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>

                <tr v-for="dato in datos_tabla" :key="dato.id">
                    <td>{{ dato.id }}</td>
                    <td>{{ dato.curso }}</td>
                    <td>{{ dato.cupos }}</td>
                    <td>{{ dato.inscritos }}</td>
                    <td>{{ dato.duracion }}</td>
                    <td>{{ dato.costo }}</td>
                    <td>{{ dato.terminado }}</td>
                    <td>{{ dato.fecha }}</td>
                    <td>
                        <b-button variant="warning" v-on:click.prevent="activarEditar(dato.id)"> <i class="fa-regular fa-pen-to-square"></i> </b-button>
                        <b-button variant="danger" v-on:click.prevent="BotonEliminar(dato.id)"> <i
                                class="fa-regular fa-trash-can"></i> </b-button>
                    </td>
                </tr>
            </table>

        </div>

                        <!-- MODAL -->
                        <div>
              <b-modal v-model="modalShow">
              
                <div>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Nombre del Curso:"
                        label-for="input-1"
                        description="Ingrese el nombre del curso"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.curso"
                          type="text"
                          placeholder="Ingrese Nombre"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group 
                        id="input-group-2" 
                        label="URL Imagen del Curso:" 
                        label-for="input-2"
                        description="Ingrese url de imagen del curso">
                        <b-form-input
                          id="input-2"
                          v-model="form.img"
                          placeholder="Ingrese URL imagen"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group 
                        id="input-group-3" 
                        label="Cupos del Curso:" 
                        label-for="input-3"
                        description="Ingrese cantidad de cupos del curso">
                        <b-form-input
                          id="input-3"
                          type="number"
                          v-model="form.cupos"
                          placeholder="Ingrese cupos"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group 
                        id="input-group-4" 
                        label="Inscritos en el Curso:" 
                        label-for="input-4"
                        description="Ingrese la cantidad de inscritos en el curso">
                        <b-form-input
                          id="input-4"
                          type="number"
                          v-model="form.inscritos"
                          placeholder="Ingrese inscritos"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group 
                        id="input-group-5" 
                        label="Duración del Curso:" 
                        label-for="input-5"
                        description="Ingrese la duración del curso">
                        <b-form-input
                          id="input-5"
                          v-model="form.duracion"
                          placeholder="Ingrese duración"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group 
                        id="input-group-6" 
                        label="Fecha de Registro:" 
                        label-for="input-6"
                        description="Ingrese la fecha de registro del curso">
                        <b-form-input
                          id="input-6"
                          type="text"
                          v-model="form.fecha"
                          placeholder="Ingrese fecha de registro"
                          required
                        ></b-form-input>
                      </b-form-group>


                      <b-form-group 
                        id="input-group-7" 
                        label="Costo del Curso:" 
                        label-for="input-7"
                        description="Ingrese el costo del curso">
                        <b-form-input
                          id="input-7"
                          type="number"
                          v-model="form.costo"
                          placeholder="Ingrese costo"
                          required
                        ></b-form-input>
                      </b-form-group>


                      <b-form-textarea
                        id="textarea"
                        v-model="form.descripcion"
                        placeholder="Descripción del Curso"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>


                      <b-button type="submit" variant="warning">Cambiar Info</b-button>
                      <b-button type="reset" variant="danger">Reset</b-button>
                    </b-form>
                    <b-card class="mt-3" header="Form Data Result">
                      <pre class="m-0">{{ form }}</pre>
                    </b-card>
                </div>            
              
              
              
              </b-modal>
            </div>
<!-- FIN MODAL-->

    </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'tablaComponent',
    props: {

    },
    data:function(){
        return {
        modalShow: false,
        form: {
          id:'',
          nombre: '',
          img: '',
          costo: 0,
          duracion:'',
          cupos:0,
          inscritos:0,
          completado:false,
          fecha_registro:'',
          descripcion:'',
        },
        form_tabla: {
          id:'',
          curso: '',
          img: '',
          costo: 0,
          duracion:'',
          cupos:0,
          inscritos:0,
          terminado:false,
          fecha:'',
          descripcion:'',
        },
        show: true,
        mostrarTabla : true,
        cursoSeleccionado: null,
      }
    },
    methods: {
        ...mapActions('InfoCursos', ['consultarDatosTabla', 'eliminarCurso','consultarCursosEditarCard', 'consultarCursosEditarTabla', 'editarDatosCard', 'editarDatosTabla']),

        BotonEliminar: function (elId) {
            let respuesta = confirm(`¿Estás seguro que deseas eliminar el curso?`)

            if (respuesta === true) {
                this.eliminarCurso(elId);
            }
        },
        onSubmit(event) {
        event.preventDefault();
        // llamamos al action que realizará la edición con los datos del modelo de datos
        this.$nextTick(() => {
          console.log('antes de editar', this.form);
          this.editarDatosCard(this.form);
        });

          // asignamos manualmente los datos que van a la tabla -_-
          // antes de enviar a editar datos de la tabla, actualizamos los campos que no tiene two way data binding con los campos que si tienen two way data binding del form
          // como hay dos state pero un solo formulario es necesario actualizar el segundo modelo de datos que no tiene two way data binding con los datos que si tienen two way databinding antes de enviar a almacenar
          this.form_tabla.id=this.form.id;
          this.form_tabla.curso=this.form.nombre;
          this.form_tabla.img=this.form.img;
          this.form_tabla.costo=this.form.costo;
          this.form_tabla.duracion=this.form.duracion;
          this.form_tabla.cupos=this.form.cupos
          this.form_tabla.inscritos=this.form.inscritos;
          this.form_tabla.terminado=this.form.completado;
          this.form_tabla.fecha=this.form.fecha_registro;
          this.form_tabla.descripcion=this.form.descripcion;


        this.$nextTick(() => {
          console.log('onSubmit form_tabla', this.form );
          this.editarDatosTabla(this.form);
        })

        // mostramos la tabla con los cambios
        this.$nextTick(() => {
          this.mostrarTabla= true
        })
        

      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
          this.form.nombre='';
          this.form.img='',
          this.form.costo=0;
          this.form.duracion='';
          this.form.cupos=0;
          this.form.inscritos=0;
          this.form.completado=false;
          this.form.fecha_registro='';
          this.form.descripcion='';
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      activarEditar(unid){
        console.log('activareditar elid',unid);
        //ocultamos la tabla para hacer cambios
        this.$nextTick(() => {
          this.mostrarTabla = false;
        })
        // consultamos el curso de acuerdo al id para poblar el state this.curso_editar
        this.consultarCursosEditarCard(unid);
        this.consultarCursosEditarTabla(unid);
        this.modalShow = true;
        // asignamos el id manualmente al objeto del modelo de datos
        this.form.id = unid;
          // asignamos manualmente al objeto del modelo de datos los valores recuperados del state
          
          this.form.nombre=this.curso_editar_tabla.nombre;
          this.form.img=this.curso_editar_tabla.img;
          this.form.costo=this.curso_editar_tabla.costo;
          this.form.duracion=this.curso_editar_tabla.duracion;
          this.form.cupos=this.curso_editar_tabla.cupos;
          this.form.inscritos=this.curso_editar_tabla.inscritos;
          this.form.completado=this.curso_editar_tabla.completado;
          this.form.fecha_registro=this.curso_editar_tabla.fecha_registro;
          this.form.descripcion=this.curso_editar_tabla.descripcion;

          console.log('curso editar tabla', this.curso_editar_tabla);


          this.cursoSeleccionado = this.datos_tabla.find((curso) => curso.id === unid);

          // Crear una copia del objeto para mantener los datos originales intactos
          this.form = { ...this.cursoSeleccionado };


      }

    },
    computed: {
        ...mapState('InfoCursos', ['datos_tabla', 'curso_editar_card', 'curso_editar_tabla']),


    },
    created() {
        //this.consultarDatosTabla();
        //this.consultarCursos();
    }
}
</script>
  


<style scoped>
img {
    height: 250px;
}

table {
    background-color: #eaeaea;
}

th {
    padding: 2%;
    background-color: #950000;
    color: azure;
}

td {
    padding: 12px 0px 12px 0px;
}


#tablaComponent {
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#laTabla {
    display: flex;
    flex-direction: column;
    width: 80%;
}
</style>
  