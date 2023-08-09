import axios from 'axios';

const InfoCursos ={
    namespaced: true,

    state:{
        //este es el almacen
        datos:[],
        datos_tabla:[],
        curso_editar_card:[],
        curso_editar_tabla:[],
    },
    getters:{
        consultarNoCompletados:(state)=>{
            let nuevoArray = state.datos.filter(curso => curso.completado === false);

            return nuevoArray;
        },
    },
    mutations:{
        CONSULTAR_CURSOS: (state, losCursos) => {
            state.datos = losCursos;
        },
        ASIGNAR_CURSOS_NO_TERMINADOS: (state, nocompletados)=>{
            state.cursos_no_terminados = nocompletados;
        },
        CONSULTAR_DATOS_TABLA: (state, datosprocesados)=>{
            state.datos_tabla = datosprocesados;
        },
        ELIMINAR_CURSO: (state, unId)=>{
            let elIndice = state.datos_tabla.findIndex(registro => registro.id == unId);
            state.datos_tabla.splice(elIndice, 1);
        },
        REGISTRAR_DATOS_CARDS:(state, unNuevoCurso)=>{
            state.datos.push(unNuevoCurso);
        },
        REGISTRAR_DATOS_TABLA:(state, unNuevoCurso)=>{
            state.datos_tabla.push(unNuevoCurso);
        },
        CONSULTAR_CURSOS_EDITAR_CARD:(state, id)=>{
            // console.log('CONSULTAR_CURSOS_EDITAR');
            let elindice =  state.datos.findIndex(registro => registro.id == id);
            //seteamos state para card
            state.curso_editar_card = state.datos[elindice];
        },
        CONSULTAR_CURSOS_EDITAR_TABLA:(state, id)=>{
            console.log('CONSULTAR_CURSOS_EDITAR_TABLA', id);
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == id);
            console.log('indice CONSULTAR_CURSOS_EDITAR_TABLA', elindice)
            // seteamos state para tabla
            state.curso_editar_tabla = state.datos_tabla[elindice];
        },
        EDITAR_DATOS_CARD:(state,objetoregistro)=>{
            console.log('EDITAR_DATOS_CARD', objetoregistro);
            let elindice =  state.datos.findIndex(registro => registro.id == objetoregistro.id);
            console.log(elindice)
            state.datos.splice(elindice,1,objetoregistro);
            console.log(state.datos_tabla);

        },
        EDITAR_DATOS_TABLA:(state,objetoregistro)=>{
            console.log('EDITAR_DATOS_TABLA', objetoregistro);
            let elindice =  state.datos_tabla.findIndex(registro => registro.id == objetoregistro.id);
            console.log(elindice)
            state.datos_tabla.splice(elindice,1,objetoregistro);
            console.log(state.datos_tabla);
        }
    },
    actions:{
        consultarCursos:(context)=>{
            console.log('LLAMADO A CONSULTAR CURSOS');
            // si el json lo tenemos guardado en la carpeta publica
            let url = "datoscursos.json";

            // si el json es servido mediante json-server
            // hay que guardar el json en una carpeta (fake_api)
            // levantar el servidor en la carpeta (fake_api) con el comando json-server --watch archivo.json
            // let url = "http://localhost:3000/cursos";
            axios.get(url)
                .then(respuesta=>{
                    // console.log(respuesta);

                    // salida del servidor localhost 3000
                    console.log(respuesta.data);

                    // salida del servidor localhost 3000
                    // context.commit('CONSULTAR_CURSOS', respuesta.data);
                    // console.log(typeof respuesta.data);


                    // salida del archivo json puro
                    console.log(respuesta.data.cursos);

                    // salida del archivo json puro
                    context.commit('CONSULTAR_CURSOS', respuesta.data.cursos);




                })
                .catch(err=>{
                    console.log(err);
                });
        },
        consultarDatosTabla:(context)=>{
            console.log('LLAMADO A CONSULTAR DATOS TABLA');
            let url = "datoscursos.json";
            // let url = "http://localhost:3000/cursos";
            axios.get(url)
                .then(respuesta=>{
                    // console.log(respuesta);
                    // salida del servidor localhost 3000
                    // console.log(respuesta.data);

                    // let longitud = respuesta.data.length;
                    let longitud = respuesta.data.cursos.length;
                    // console.log('longitud:', longitud);
                    let nuevoArreglo = [];
                    for(let i=0; i < longitud ; i ++){
                        let registro = {};

                        registro.id = respuesta.data.cursos[i].id;
                        registro.curso = respuesta.data.cursos[i].nombre;
                        registro.cupos = respuesta.data.cursos[i].cupos;
                        registro.inscritos = respuesta.data.cursos[i].inscritos;
                        registro.duracion = respuesta.data.cursos[i].duracion;
                        registro.costo = respuesta.data.cursos[i].costo;
                        registro.terminado = respuesta.data.cursos[i].completado;
                        registro.fecha = respuesta.data.cursos[i].fecha_registro;
                        registro.img = respuesta.data.cursos[i].img;
                        registro.descripcion = respuesta.data.cursos[i].descripcion;
                        registro.acciones = '';

                        nuevoArreglo.push(registro);
                    };

                    // console.log('nuevoArreglo:', nuevoArreglo);
                    context.commit('CONSULTAR_DATOS_TABLA', nuevoArreglo);


                })
                .catch(err=>{
                    console.log(err);
                });
        },
        consultarCursosEditarCard:(context, id)=>{
            // console.log('consultarCursosEditar', id);
            context.commit('CONSULTAR_CURSOS_EDITAR_CARD', id);
        },
        consultarCursosEditarTabla:(context, id)=>{
            console.log('consultarCursosEditar', id);
            context.commit('CONSULTAR_CURSOS_EDITAR_TABLA', id);
        },
        editarDatosCard:(context, objetoregistro)=>{
            context.commit('EDITAR_DATOS_CARD',objetoregistro);
        },
        editarDatosTabla:(context, objetoregistro)=>{
            console.log('editarDatosTabla objetoRegistro', objetoregistro);
            context.commit('EDITAR_DATOS_TABLA',objetoregistro);
        },
        eliminarCurso:(context, id)=>{
            context.commit('ELIMINAR_CURSO', id);
        },
        registrarDatosCards:(context, nuevoCurso)=>{
            context.commit('REGISTRAR_DATOS_CARDS', nuevoCurso);
        },
        registrarDatosTabla:(context, nuevoCurso)=>{
            context.commit('REGISTRAR_DATOS_TABLA', nuevoCurso);
        },
    },
    modules:{},

}

export default InfoCursos;