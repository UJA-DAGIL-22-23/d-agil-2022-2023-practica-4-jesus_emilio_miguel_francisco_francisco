/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};

Frontend.nombresOrdenados = false;

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

    document.getElementById("btn-tenis").classList.add("ocultar")
    document.getElementById("btn-tenis-listar").classList.add("mostrar")
}

Frontend.ocultarOpcionesTenis = function () {
    document.getElementById("btn-tenis").classList.remove("ocultar")
    document.getElementById("btn-tenis-listar").classList.remove("mostrar")

    document.getElementById("btn-tenis").classList.add("mostrar")
    document.getElementById("btn-tenis-listar").classList.add("ocultar")
}

/**
 * Muestra los botones de boxeo. 
 */
Frontend.mostrarOpcionesBoxeo = function () {
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
Frontend.ID_BODY = "cuerpo-aplicacion"

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
 * Función principal para recuperar los nombres de los jugadores desde el MS y, posteriormente, imprimirlos.
 */
Frontend.procesarNombresCompleto = function () {
    this.recupera2(this.imprimeNombres);
}

/**
 * Función principal para recuperar los nombres de los jugadores desde el MS y, posteriormente, imprimirlos.
 */
Frontend.procesarFiltrarDeportistas = function () {
    this.recuperaYfiltra(this.imprimeFiltrados);
}

Frontend.recupera2 = async function (callBackFn) {
    try {
        const urlCriquet = Frontend.API_GATEWAY + "/criquet/getTodosJugadores"
        const urlFutbolsala = Frontend.API_GATEWAY + "/futbolsala/get-Todos"
        const urlTenis = Frontend.API_GATEWAY + "/tenis/getTodos"
        const urlAtletas = Frontend.API_GATEWAY + "/atletas/getTodos"
        const urlBoxeo = Frontend.API_GATEWAY + "/boxeo/getTodas"

        const responseCriquet = await fetch(urlCriquet);
        const responseFutbolsala = await fetch(urlFutbolsala);
        const responseTenis = await fetch(urlTenis);
        const responseAtletas = await fetch(urlAtletas);
        const responseBoxeo = await fetch(urlBoxeo);

        const dataCriquet = await responseCriquet.json();
        const dataFutbolsala = await responseFutbolsala.json();
        const dataTenis = await responseTenis.json();
        const dataAtletas = await responseAtletas.json();
        const dataBoxeo = await responseBoxeo.json();

        const vectorJugadores = [
            ...dataCriquet.data,
            ...dataFutbolsala.data,
            ...dataTenis.data,
            ...dataAtletas.data,
            ...dataBoxeo.data

        ];

        callBackFn(vectorJugadores);
    } catch (error) {
        alert("Error: No se han podido acceder a los microservicios");
        console.error(error);
        //throw error
    }
};

Frontend.recuperaYfiltra = async function (callBackFn) {
    try {
        const urlCriquet = Frontend.API_GATEWAY + "/criquet/getTodosJugadores"
        const urlFutbolsala = Frontend.API_GATEWAY + "/futbolsala/get-Todos"
        const urlTenis = Frontend.API_GATEWAY + "/tenis/getTodos"
        const urlAtletas = Frontend.API_GATEWAY + "/atletas/getTodos"
        const urlBoxeo = Frontend.API_GATEWAY + "/boxeo/getTodas"

        const responseCriquet = await fetch(urlCriquet);
        const responseFutbolsala = await fetch(urlFutbolsala);
        const responseTenis = await fetch(urlTenis);
        const responseAtletas = await fetch(urlAtletas);
        const responseBoxeo = await fetch(urlBoxeo);

        const dataCriquet = await responseCriquet.json();
        const dataFutbolsala = await responseFutbolsala.json();
        const dataTenis = await responseTenis.json();
        const dataAtletas = await responseAtletas.json();
        const dataBoxeo = await responseBoxeo.json();

        const vectorJugadores = [];
        const inputFiltrado = document.getElementById('filtrado');

        let cadenaBusqueda = "";
        if(inputFiltrado != null)
            if(inputFiltrado.value != null)
                cadenaBusqueda = inputFiltrado.value.toLowerCase();

        // Recorre los datos de criquet y busca coincidencias con la cadena de búsqueda
        dataCriquet.data.forEach(persona => {
            if (persona.data.nombre.toLowerCase().includes(cadenaBusqueda) || cadenaBusqueda === '') {
                const deportista = {
                    deporte: "Criquet"
                };
        
                // Copia todos los atributos de la persona al deportista
                Object.assign(deportista, persona);
        
                vectorJugadores.push(deportista);
            }
        });

        // Repite el mismo proceso para los datos de fútbol sala
        dataFutbolsala.data.forEach(persona => {
            if (persona.data.nombre.toLowerCase().includes(cadenaBusqueda) || cadenaBusqueda === '') {
                const deportista = {
                    deporte: "Fútbol Sala"
                };

                // Copia todos los atributos de la persona al deportista
                Object.assign(deportista, persona);

                vectorJugadores.push(deportista);
            }
        });

        // Repite el mismo proceso para los datos de tenis
        dataTenis.data.forEach(persona => {
            if (persona.data.nombre.toLowerCase().includes(cadenaBusqueda) || cadenaBusqueda === '') {
                const deportista = {
                    deporte: "Tenis"
                };

                // Copia todos los atributos de la persona al deportista
                Object.assign(deportista, persona);

                vectorJugadores.push(deportista);
            }
        });

        // Repite el mismo proceso para los datos de atletas
        dataAtletas.data.forEach(persona => {
            if (persona.data.nombre.toLowerCase().includes(cadenaBusqueda) || cadenaBusqueda === '') {
                const deportista = {
                    deporte: "Atletas"
                };

                // Copia todos los atributos de la persona al deportista
                Object.assign(deportista, persona);

                vectorJugadores.push(deportista);
            }
        });

        // Repite el mismo proceso para los datos de boxeo
        dataBoxeo.data.forEach(persona => {
            if (persona.data.nombre.toLowerCase().includes(cadenaBusqueda) || cadenaBusqueda === '') {
                const deportista = {
                    deporte: "Boxeo"
                };

                // Copia todos los atributos de la persona al deportista
                Object.assign(deportista, persona);

                vectorJugadores.push(deportista);
            }
        });


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

    if(Frontend.nombresOrdenados){
        vector.sort((a, b) => (a.data.nombre > b.data.nombre) ? 1 : ((b.data.nombre > a.data.nombre) ? -1 : 0))
    }

    let msj = "";
    msj += Frontend.cabeceraTableNombres();
    vector.forEach(e => msj += Frontend.cuerpoTrNombres(e))
    msj += Frontend.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres completo", msj)
}

/**
 * Función para mostrar en pantalla todos los nombres y deportes de los jugadores que se han recuperado de la BBDD.
 * @param {vector_de_jugadores} vector Vector con los nombres y deportes de los jugadores a mostrar
 */

Frontend.imprimeFiltrados = function (vector) {

    let msj = "";
    msj += Frontend.cabeceraTableFiltrados();
    vector.forEach(e => msj += Frontend.cuerpoTrFiltrados(e))
    msj += Frontend.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de deportistas filtrados", msj)
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Frontend.cabeceraTableNombres = function () {
    return `<table class="listado-jugadores">
        <thead style="cursor: pointer;" onClick="Frontend.ordenar()" >
            <th>Nombre</th>
        </thead>
        <tbody>
    `;
}

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Frontend.cabeceraTableFiltrados = function () {
    return `<table class="listado-jugadores">
        <div>
            <label for="filtrado">Filtrar:</label>
            <input type="text" id="filtrado" name="filtrado">
            <button onclick="Frontend.procesarFiltrarDeportistas()">Filtrar</button>
        </div>
        <br></br>
        <thead>
            <th>Nombre</th>
            <th>Deporte</th>
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
 * Muestra el nombre y deporte de cada jugador en un elemento TR con sus correspondientes TD
 * @param {jugador} a Nombre del jugador a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el jugador.
 */
Frontend.cuerpoTrFiltrados = function (a) {
    const d = a.data

    return `<tr title="${a.ref['@ref'].id}">
            <td><em>${d.nombre}</em></td>
            <td><em>${a.deporte}</em></td>
            </tr>`;
}

/**
 * Pie de la tabla en la que se muestran los jugadores
 * @returns Cadena con el pie de la tabla
 */
Frontend.pieTable = function () {
    return "</tbody></table>";
}

Frontend.ordenar = function (){
    Frontend.nombresOrdenados = !Frontend.nombresOrdenados;
    this.recupera2(this.imprimeNombres);
}


let opcionesSeleccionadas = new Cola(10);

Frontend.guardarOpcionPulsada = function(opcion) {
    opcionesSeleccionadas.encolar(opcion);
    console.log(opcionesSeleccionadas);
}

Frontend.mostrarOpcionesPulsadas = function(opcionesSeleccionadasPrueba) {
    const opcionesSeleccionadasArray = opcionesSeleccionadasPrueba?.obtenerElementos() || opcionesSeleccionadas?.obtenerElementos()
    //console.log(opcionesSeleccionadas.obtenerElementos());
    let msj = '<table class="listado-jugadores">';
    msj += '<tr><th>Número</th><th>Opción</th></tr>';
  
    for (let i = 0; i < opcionesSeleccionadasArray.length; i++) {
      const dato = opcionesSeleccionadasArray[i];
      msj += '<tr>';
      msj += '<td>' + (i + 1) + '</td>';
      msj += '<td>' + dato + '</td>';
      msj += '</tr>';
    }
  
    msj += '</table>';
  
    Frontend.Article.actualizar("Opciones pulsadas", msj);

Frontend.cambiarContraste = function () {
    if(document.getElementById(Frontend.ID_BODY).classList.length > 0)
        document.getElementById(Frontend.ID_BODY).classList.remove('alto-contraste')
    else {
        document.getElementById(Frontend.ID_BODY).classList.add('alto-contraste')
    }
}