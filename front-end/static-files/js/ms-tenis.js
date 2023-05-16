/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Tenis = {};

let _vector = null;


/**
 * Función que recupera todos los tenistas llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Tenis.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/tenis/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los tenistas que se han descargado
    let vectorTenistas = null
    if (response) {
        vectorTenistas = await response.json()
        callBackFn(vectorTenistas.data)
    }
}




// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Tenis.cabeceraTable = function () {
    return `<table class="listado-tenistas">
    <div>
        <label for="busqueda">Buscar:</label>
        <input type="text" id="busqueda" name="busqueda" class="busqueda">
        <button onclick="Tenis.buscar()" class="opcion-principal">Buscar</button>
    </div>
        <thead>
        <th><a href="#" id="ordenar-nombre" class="enlace">Nombre</a></th>
        <th><a href="#" id="ordenar-apellidos" class="enlace">Apellidos</a></th>
        <th><a href="#" id="ordenar-fechaNac" class="enlace">Fecha de nacimiento</a></th>
        <th><a href="#" id="ordenar-partMundial" class="enlace">Participaciones mundiales</a></th>
        <th><a href="#" id="ordenar-numMedallas" class="enlace">Número de medallas</a></th>
        <th>Acciones</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada tenista en un elemento TR con sus correspondientes TD
 * @param {tenista} t Datos del tenista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el tenista.
 */
Tenis.cuerpoTr = function (t) {
    const d = t.data;
    return `<tr title="${t.ref['@ref'].id}">
    <td><em>${d.nombre}</em></td>
    <td><em>${d.apellidos}</em></td>
    <td><em>${d.fechaNac.dia}/${d.fechaNac.mes}/${d.fechaNac.ano}</em></td>
    <td><em>${d.partMundial.join(", ")}</em></td>
    <td><em>${d.numMedallas}</em></td>
    <td>
        <div><a href="javascript:Tenis.mostrar('${t.ref['@ref'].id}')" class="opcion-secundaria">Mostrar</a></div>
    </td>
    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran los tenistas
 * @returns Cadena con el pie de la tabla
 */
Tenis.pieTable = function () {
    return "</tbody></table>";
}

Tenis.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    _vector = vector;
    //console.log( _vector ) // Para comprobar lo que hay en _vector
    let msj = "";
    msj += Tenis.cabeceraTable();

    // Ordenamos el vector alfabéticamente por nombre
    vector.sort(function(a, b) {
        const aNombre = a.data.nombre;
        const bNombre = b.data.nombre;
        return aNombre.localeCompare(bNombre);
    });

    vector.forEach(e => msj += Tenis.cuerpoTr(e))
    msj += Tenis.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de tenistas", msj )

    // Manejador de eventos para ordenar la tabla por nombre
    const tabla = document.querySelector(".listado-tenistas");
    const botonOrdenarNombre = document.querySelector("#ordenar-nombre");
    botonOrdenarNombre.addEventListener("click", function(e) {
        e.preventDefault();
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const ordenInicial = botonOrdenarNombre.dataset.orden === undefined || botonOrdenarNombre.dataset.orden === "desc";
        const factor = ordenInicial ? -1 : 1;
        botonOrdenarNombre.dataset.orden = ordenInicial ? "asc" : "desc";
        arrFilas.sort(function(a, b) {
            const aNombre = a.querySelector("td:first-child em").textContent;
            const bNombre = b.querySelector("td:first-child em").textContent;
            return aNombre.localeCompare(bNombre) * factor;
        });
        arrFilas.forEach(function(fila) {
            tabla.querySelector("tbody").appendChild(fila);
        });
    });

    // Manejador de eventos para ordenar la tabla por apellidos
    const botonOrdenarApellidos = document.querySelector("#ordenar-apellidos");
    botonOrdenarApellidos.addEventListener("click", function(e) {
        e.preventDefault();
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const ordenInicial = botonOrdenarApellidos.dataset.orden === undefined || botonOrdenarApellidos.dataset.orden === "desc";
        const factor = ordenInicial ? -1 : 1;
        botonOrdenarApellidos.dataset.orden = ordenInicial ? "asc" : "desc";
        arrFilas.sort(function(a, b) {
            const aApellidos = a.querySelector("td:nth-child(2) em").textContent;
            const bApellidos = b.querySelector("td:nth-child(2) em").textContent;
            return aApellidos.localeCompare(bApellidos) * factor;
        });
        arrFilas.forEach(function(fila) {
            tabla.querySelector("tbody").appendChild(fila);
        });
    });

    // Manejador de eventos para ordenar la tabla por fecha de nacimiento
    const botonFechaNac = document.querySelector("#ordenar-fechaNac");
    botonFechaNac.addEventListener("click", function(e) {
        e.preventDefault();
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const ordenInicial = botonFechaNac.dataset.orden === undefined || botonFechaNac.dataset.orden === "desc";
        const factor = ordenInicial ? -1 : 1;
        botonFechaNac.dataset.orden = ordenInicial ? "asc" : "desc";
        arrFilas.sort(function(a, b) {
            const aFechaNac = a.querySelector("td:nth-child(3) em").textContent;
            const bFechaNac = b.querySelector("td:nth-child(3) em").textContent;
            const aFechaNacDate = new Date(Date.parse(aFechaNac.split("/").reverse().join("-")));
            const bFechaNacDate = new Date(Date.parse(bFechaNac.split("/").reverse().join("-")));
            return (aFechaNacDate - bFechaNacDate) * factor;
        });
        arrFilas.forEach(function(fila) {
            tabla.querySelector("tbody").appendChild(fila);
        });
    });

    // Manejador de eventos para ordenar la tabla por número de mundiales en los que ha participado
    const botonPartMundial = document.querySelector("#ordenar-partMundial");
    botonPartMundial.addEventListener("click", function(e) {
        e.preventDefault();
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const ordenInicial = botonPartMundial.dataset.orden === undefined || botonPartMundial.dataset.orden === "desc";
        const factor = ordenInicial ? -1 : 1;
        botonPartMundial.dataset.orden = ordenInicial ? "asc" : "desc";
        arrFilas.sort(function(a, b) {
            const aPartMundial = a.querySelector("td:nth-child(4) em").textContent.split(',').length;
            const bPartMundial = b.querySelector("td:nth-child(4) em").textContent.split(',').length;
            return (aPartMundial - bPartMundial) * factor;
        });
        arrFilas.forEach(function(fila) {
            tabla.querySelector("tbody").appendChild(fila);
        });
    });

    // Manejador de eventos para ordenar la tabla por número de medallas
    const botonOrdenarMedallas = document.querySelector("#ordenar-numMedallas");
    botonOrdenarMedallas.addEventListener("click", function(e) {
        e.preventDefault();
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const ordenInicial = botonOrdenarMedallas.dataset.orden === undefined || botonOrdenarMedallas.dataset.orden === "desc";
        const factor = ordenInicial ? -1 : 1;
        botonOrdenarMedallas.dataset.orden = ordenInicial ? "asc" : "desc";
        arrFilas.sort(function(a, b) {
            const aMedallas = a.querySelector("td:nth-child(5) em").textContent;
            const bMedallas = b.querySelector("td:nth-child(5) em").textContent;
            return (parseInt(aMedallas) - parseInt(bMedallas)) * factor;
        });
        arrFilas.forEach(function(fila) {
            tabla.querySelector("tbody").appendChild(fila);
        });
    });
}

/**
 * Función principal para recuperar los tenistas desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Tenis.listar = function () {
    this.recupera(this.imprime);
}

/**
 * Función principal para mostrar los datos de un tenista desde el MS y, posteriormente, imprimirlo.
 * @param {String} idTenista Identificador del tenista a mostrar
 */
Tenis.mostrar = function (idTenista) {
    let tenistaSeleccionado = null;
    let indiceTenistaSeleccionado = 0;

    for (let i = 0; i < _vector.length; i++) {
        if (_vector[i].ref['@ref'].id === idTenista) {
            tenistaSeleccionado = _vector[i];
            indiceTenistaSeleccionado = i;
            break;
        }
    }

    // Mostrar los datos del tenista
    this.recuperaUnTenista(tenistaSeleccionado.ref['@ref'].id, this.imprimeUnTenista, indiceTenistaSeleccionado - 1, indiceTenistaSeleccionado + 1);
}

/**
 * Función que recupera un tenista llamando al MS Plantilla. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idTenista Identificador del tenista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Tenis.recuperaUnTenista = async function (idTenista, callBackFn, indiceAnterior, indiceSiguiente) {
    try {
        const url = Frontend.API_GATEWAY + "/tenis/getPorId/" + idTenista
        const response = await fetch(url);
        if (response) {
            const tenista = await response.json()
            callBackFn(tenista, indiceAnterior, indiceSiguiente)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway al recuperar un tenista")
        console.error(error)
    }
}

/**
 * Función para mostrar en pantalla los datos del tenista recuperado.
 * @param {Tenista} tenista Datos del tenista a mostrar
 */
Tenis.imprimeUnTenista = function (tenista, indiceAnterior, indiceSiguiente) {
    const fechaNac = `${tenista.data.fechaNac.dia}/${tenista.data.fechaNac.mes}/${tenista.data.fechaNac.ano}`;
    const partMundial = tenista.data.partMundial.join(", ");
    let msj = "";
    msj += `<table class="listado-tenistas">
            <tbody>
                <tr><th>Nombre</th><td>${tenista.data.nombre}</td></tr>
                <tr><th>Apellidos</th><td>${tenista.data.apellidos}</td></tr>
                <tr><th>Fecha Nacimiento</th><td>${fechaNac}</td></tr>
                <tr><th>Participaciones en mundiales</th><td>${partMundial}</td></tr>
                <tr><th>Número de medallas</th><td>${tenista.data.numMedallas}</td></tr>
            </tbody>
        </table>`;

    //Botones anterior y siguiente para mostrar (si existe) el anterior o siguiente tenista del listado actual
    if(_vector[indiceAnterior]?.ref['@ref'].id){
        msj += `<div><a href="javascript:Tenis.mostrar('${_vector[indiceAnterior]?.ref['@ref'].id}')" class="opcion-secundaria boton-anterior">Anterior</a></div>`;
    }
    if(_vector[indiceSiguiente]?.ref['@ref'].id){
        msj += `<div><a href="javascript:Tenis.mostrar('${_vector[indiceSiguiente]?.ref['@ref'].id}')" class="opcion-secundaria boton-siguiente">Siguiente</a></div>`;
    }

    Frontend.Article.actualizar("Detalle de tenista", msj);
}

// Función que busca un tenista que cumpla un determinado criterio de búsqueda
Tenis.buscar = function () {
    Tenis.recupera(this.filtraVector)
}

/**
 * Función que filtra todos los tenistas según el criterio de búsqueda que se le pase.
 * Se puede buscar por Nombre, Apellidos, años de Participaciones en Mundiales y Número de medallas
 * @param {tenistas} vector Vector con todos los tenistas de la base de datos 
 * @param {String} _terminoBusqueda Término de búsqueda con el que se realizará el filtrado (se usará 
 * para comprobar el comportamiento de la función con los diferentes tests de Jasmine que se han creado para este método) 
 */
Tenis.filtraVector = function (vector, _terminoBusqueda) {

    //console.log("---flitraVector---")
    //console.log(vector);
    //console.log(_terminoBusqueda)

    vector = vector || Tenis.vectorTenistasNulos

    const terminoBusqueda = _terminoBusqueda || document.getElementById("busqueda").value.trim()    // Si no se pasa un término de búsqueda, se obtendrá el escrito en el formulario de búsqueda.

    if (typeof vector !== "object") vector = Tenis.vectorTenistasNulos

    // Comprueba que terminoBusqueda no sea undefined
    if (terminoBusqueda) {

        // Filtra todos los tensitas según el criterio de búsqueda que se obtiene
        const terminoBusquedaValor = terminoBusqueda.toLowerCase();
        const isNumero = /^\d+$/.test(terminoBusquedaValor);
        const vectorFiltrado = vector.filter(tenista =>
            tenista.data.nombre.toLowerCase() === terminoBusquedaValor ||
            tenista.data.apellidos.toLowerCase() === terminoBusquedaValor ||
            (isNumero && tenista.data.partMundial.includes(Number(terminoBusquedaValor))) ||
            tenista.data.numMedallas.toString() === terminoBusquedaValor
        );


        // Imprime el vector filtrado y devuelve el vector filtrado para los expects
        Tenis.imprime(vectorFiltrado);
        return vectorFiltrado;
    } else {

        // Devuelve un vector vacío
        return []
    }
}

Tenis.vectorTenistasNulos = [
    {
        ref: {
            "@ref": {
                id: ""
            }
        },
        data: {
            nombre: "",
            apellidos: "",
            fechaNac: {
                dia: "",
                mes: "",
                año: ""
            },
            partMundial: [],
            numMedallas: ""
        }
    }
];


// Plantilla de datosDescargados vacíos
Tenis.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Tenis.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Tenis.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Tenis.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.añadirContenido(mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Tenis.procesarHome = function () {
    this.descargarRuta("/tenis/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Tenis.procesarAcercaDe = function () {
    this.descargarRuta("/tenis/acercade", this.mostrarAcercaDe);
}



