/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};

// Estos dos métodos muestran los botones de la aplicación de fútbol sala. Al pulsar sobre el botón 'Home'
// se vuelve a mostrar el botón con id 'btn-fsala' y es ocultan todos los demás
Frontend.mostrarOpcionesFSala = function () {
    document.getElementById("btn-fsala").classList.remove("mostrar")
    document.getElementById("btn-fsala-listado").classList.remove("ocultar")
    document.getElementById("btn-fsala-nombres").classList.remove("ocultar")
    document.getElementById("btn-fsala-nombresorden").classList.remove("ocultar")
    document.getElementById("btn-fsala-añadir").classList.remove("ocultar")

    document.getElementById("btn-fsala").classList.add("ocultar")
    document.getElementById("btn-fsala-listado").classList.add("mostrar")
    document.getElementById("btn-fsala-nombres").classList.add("mostrar")
    document.getElementById("btn-fsala-nombresorden").classList.add("mostrar")
    document.getElementById("btn-fsala-añadir").classList.add("mostrar")
}

Frontend.ocultarOpcionesFSala = function () {
    document.getElementById("btn-fsala").classList.remove("ocultar")
    document.getElementById("btn-fsala-listado").classList.remove("mostrar")
    document.getElementById("btn-fsala-nombres").classList.remove("mostrar")
    document.getElementById("btn-fsala-nombresorden").classList.remove("mostrar")
    document.getElementById("btn-fsala-añadir").classList.remove("mostrar")

    document.getElementById("btn-fsala").classList.add("mostrar")
    document.getElementById("btn-fsala-listado").classList.add("ocultar")
    document.getElementById("btn-fsala-nombres").classList.add("ocultar")
    document.getElementById("btn-fsala-nombresorden").classList.add("ocultar")
    document.getElementById("btn-fsala-añadir").classList.add("ocultar")
}


/**
 * Muestra los botones de la aplicación de críquet. 
 */
Frontend.mostrarOpcionesCriquet = function () {
    document.getElementById("btn-criquet").classList.remove("mostrar")
    document.getElementById("btn-criquet-listado").classList.remove("ocultar")
    document.getElementById("btn-criquet-nombres").classList.remove("ocultar")

    document.getElementById("btn-criquet").classList.add("ocultar")
    document.getElementById("btn-criquet-listado").classList.add("mostrar")
    document.getElementById("btn-criquet-nombres").classList.add("mostrar")
}

/**
 * Al pulsar sobre el botón 'Home' se vuleve a mostrar el botón con id 'btn-criquet' y se ocultan los demás.
 */
Frontend.ocultarOpcionesCriquet = function () {
    document.getElementById("btn-criquet").classList.remove("ocultar")
    document.getElementById("btn-criquet-listado").classList.remove("mostrar")
    document.getElementById("btn-criquet-nombres").classList.remove("mostrar")

    document.getElementById("btn-criquet").classList.add("mostrar")
    document.getElementById("btn-criquet-listado").classList.add("ocultar")
    document.getElementById("btn-criquet-nombres").classList.add("ocultar")
}


Frontend.mostrarOpcionesTenis = function () {
    document.getElementById("btn-tenis").classList.remove("mostrar")
    document.getElementById("btn-tenis-listar").classList.remove("ocultar")
    document.getElementById("btn-tenis-acercade").classList.remove("ocultar")
    document.getElementById("btn-tenis-home").classList.remove("ocultar")

    document.getElementById("btn-tenis").classList.add("ocultar")
    document.getElementById("btn-tenis-listar").classList.add("mostrar")
    document.getElementById("btn-tenis-acercade").classList.add("mostrar")
    document.getElementById("btn-tenis-home").classList.add("mostrar")
}

Frontend.ocultarOpcionesTenis = function () {
    document.getElementById("btn-tenis").classList.remove("ocultar")
    document.getElementById("btn-tenis-listar").classList.remove("mostrar")
    document.getElementById("btn-tenis-acercade").classList.remove("mostrar")
    document.getElementById("btn-tenis-home").classList.remove("mostrar")

    document.getElementById("btn-tenis").classList.add("mostrar")
    document.getElementById("btn-tenis-listar").classList.add("ocultar")
    document.getElementById("btn-tenis-acercade").classList.add("ocultar")
    document.getElementById("btn-tenis-home").classList.add("ocultar")
}

/**
 * Muestra los botones de boxeo. 
 */
Frontend.mostrarOpcionesBoxeo = function (){
    document.getElementById("btn-boxeo").classList.remove("mostrar")
    document.getElementById("btn-box-listar").classList.remove("ocultar")
    document.getElementById("btn-box-listar-nombre").classList.remove("ocultar")
    document.getElementById("btn-box-buscar").classList.remove("ocultar")

    document.getElementById("btn-boxeo").classList.add("ocultar")
    document.getElementById("btn-box-listar").classList.add("mostrar")
    document.getElementById("btn-box-listar-nombre").classList.add("mostrar")
    document.getElementById("btn-box-buscar").classList.add("mostrar")
}

/**
 * Al pulsar sobre el botón 'Home' se vuleve a mostrar el botón con id 'btn-criquet' y se ocultan los demás.
 */
Frontend.ocultarOpcionesBoxeo = function () {
    document.getElementById("btn-boxeo").classList.remove("ocultar")
    document.getElementById("btn-box-listar").classList.remove("mostrar")
    document.getElementById("btn-box-listar-nombre").classList.remove("mostrar")
    document.getElementById("btn-box-buscar").classList.remove("mostrar")

    document.getElementById("btn-boxeo").classList.add("mostrar")
    document.getElementById("btn-box-listar").classList.add("ocultar")
    document.getElementById("btn-box-listar-nombre").classList.add("ocultar")
    document.getElementById("btn-box-buscar").classList.add("ocultar")
}



/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = titulo
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = contenido
    return this;
}

/**
 * Añade una nueva cadena al contenido del article
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.añadirContenido = function (contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    contenido = contenido || ""

    // Sustituyo el título y el contenido del articulo
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML += contenido
    return this;
}

/**
 * 
 */
Frontend.mostrarTodosAcercaDe = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = ""
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = "Datos de los estudiantes"
    FSala.procesarAcercaDe();
    Criquet.procesarAcercaDe();
    Tenis.procesarAcercaDe();
    Atletas.procesarAcercaDe();
    Boxeo.procesarAcercaDe();
}

/**
 * Función principal para recuperar los nombres de todos los jugadores desde el MS y, posteriormente, imprimirlos.
 */
/*Frontend.procesarNombresCompleto = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = ""
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = "Datos de los estudiantes"
    FSala.procesarListadoDeNombres();
    Criquet.procesarNombres();
    //Tenis.procesarNombres();
    //Atletas.procesarNombres();
}*/

/**
 * Función principal para recuperar los nombres de los jugadores desde el MS y, posteriormente, imprimirlos.
 */
Frontend.procesarNombresCompleto = function () {
    this.recupera2(this.imprimeNombres);
}

Frontend.recupera2 = async function (callBackFn) {
    try {
        const urlCriquet = Frontend.API_GATEWAY + "/criquet/getTodosJugadores"
        const urlFutbolsala = Frontend.API_GATEWAY + "/futbolsala/get-Todos"
        const urlTenis = Frontend.API_GATEWAY + "/tenis/getTodos"
        const urlAtletas = Frontend.API_GATEWAY + "/atletas/getTodos"

        const responseCriquet = await fetch(urlCriquet);
        const responseFutbolsala = await fetch(urlFutbolsala);
        const responseTenis = await fetch(urlTenis);
        const responseAtletas = await fetch(urlAtletas);

        const dataCriquet = await responseCriquet.json();
        const dataFutbolsala = await responseFutbolsala.json();
        const dataTenis = await responseTenis.json();
        const dataAtletas = await responseAtletas.json();

        const vectorJugadores = [
            ...dataCriquet.data,
            ...dataFutbolsala.data,
            ...dataTenis.data,
            ...dataAtletas.data
            
          ];

        callBackFn(vectorJugadores);
    } catch (error) {
        alert("Error: No se han podido acceder a los microservicios");
        console.error(error);
        //throw error
    }
};

/**
 * Función para mostrar en pantalla todos los nombres de los jugadores que se han recuperado de la BBDD.
 * @param {vector_de_jugadores} vector Vector con los nombres de los jugadores a mostrar
 */

Frontend.imprimeNombres = function (vector) {

    let msj = "";
    msj += Frontend.cabeceraTableNombres();
    vector.forEach(e => msj += Frontend.cuerpoTrNombres(e))
    msj += Frontend.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres", msj)
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Frontend.cabeceraTableNombres = function () {
    return `<table class="listado-jugadores">
        <thead>
            <th>Nombre</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra el nombre de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} a Nombre del jugador a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el jugador.
 */
Frontend.cuerpoTrNombres = function (a) {
    const d = a.data

    return `<tr title="${a.ref['@ref'].id}">
            <td><em>${d.nombre}</em></td>
            </tr>`;
}

/**
 * Pie de la tabla en la que se muestran los jugadores
 * @returns Cadena con el pie de la tabla
 */
Frontend.pieTable = function () {
    return "</tbody></table>";
}