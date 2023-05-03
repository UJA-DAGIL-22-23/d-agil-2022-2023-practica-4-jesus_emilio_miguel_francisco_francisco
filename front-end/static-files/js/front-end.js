/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};

// Estos dos métodos muestran los botones de la aplicación de fútbol sala. Al pulsar sobre el botón 'Home'
// se vuelve a mostrar el botón con id 'brn-fsala' y es ocultan todos los demás
Frontend.mostrarOpcionesFSala = function (){
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



Frontend.mostrarOpcionesTenis = function (){
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
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
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
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML += contenido
    return this;
}

/**
 * 
 */
Frontend.mostrarTodosAcercaDe = function () {
    //
}