/**
 * @file Boxeo.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

//guarda el input de busqueda del usuario para buscar un nombre
var nombreBuscar = ""

//input donde el usuario escribe el nombre que quiere buscar
let buscador = `
        <input type="text" name="buscador" onblur="Boxeo.buscarPersonaPorNombre()" />
      
    `

/// Creo el espacio de nombres
let Boxeo = {};

//indica que columna se va a ordenar 
Boxeo.ordenarColumnas = {
    id : false,
    nombre : false,
    fecha : false,
    titulos : false,
    victorias : false,
    empates : false,
    derrotas : false,
    categoria : false
};

/// Plantilla para poner los datos de varias personas dentro de una tabla
Boxeo.plantillaTablaPersonas = {}

Boxeo.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "FECHA": "### FECHA ###",
    "TITULOS": "### TITULOS ###",
    "VICTORIAS": "### VICTORIAS ###",
    "EMPATES": "### EMPATES ###",
    "DERROTAS": "### DERROTAS ###",
    "CATEGORIA": "### CATEGORIA ###",
}

// Plantilla de datosDescargados vacíos
Boxeo.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

/// Plantilla para poner los datos de varias personas dentro de una tabla
Boxeo.plantillaSoloNombres = {}

// Cabecera de tabla con solo nombres
Boxeo.plantillaSoloNombres.cabecera = `
<button id="boton" onClick="Boxeo.mostrarSoloNombres()" > Ordenar </button>
<table width="100%" class="listado-personas">
<thead>
    <th width="20%">Nombre</th>
</thead>
<tbody id="data">
`

// cuerpo de tabla con solo nombres
Boxeo.plantillaSoloNombres.cuerpo = `
        <tr title="${Boxeo.plantillaTags.NOMBRE}">
            <td style="text-align: center" >${Boxeo.plantillaTags.NOMBRE}</td>
        </tr>
`;

// Cabecera de la tabla con todos los datos
Boxeo.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th onClick="Boxeo.ordenarColumna('id')" width="10%">Id</th>
                        <th onClick="Boxeo.ordenarColumna('nombre')" width="20%">Nombre</th>
                        <th onClick="Boxeo.ordenarColumna('fecha')" width="20%">Fecha nacimiento</th>
                        <th onClick="Boxeo.ordenarColumna('titulos')" width="10%">Titulos</th>
                        <th onClick="Boxeo.ordenarColumna('victorias')" width="15%">Victorias</th>
                        <th onClick="Boxeo.ordenarColumna('empates')" width="15%">Empates</th>
                        <th onClick="Boxeo.ordenarColumna('derrotas')" width="15%">Derrotas</th>
                        <th onClick="Boxeo.ordenarColumna('categoria')" width="15%">Categoria</th>
                    </thead>
                    <tbody id="data">
    `;

// Elemento TR que muestra los datos de una persona
Boxeo.plantillaTablaPersonas.cuerpo = `
    <tr title="${Boxeo.plantillaTags.ID}">
        <td>${Boxeo.plantillaTags.ID}</td>
        <td>${Boxeo.plantillaTags.NOMBRE}</td>
        <td>${Boxeo.plantillaTags.FECHA}</td>
        <td>${Boxeo.plantillaTags.TITULOS}</td>
        <td>${Boxeo.plantillaTags.VICTORIAS}</td>
        <td>${Boxeo.plantillaTags.EMPATES}</td>
        <td>${Boxeo.plantillaTags.DERROTAS}</td>
        <td>${Boxeo.plantillaTags.CATEGORIA}</td>
        <td>
                    <div><a href="javascript:Boxeo.mostrar('${Boxeo.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;




// Pie de la tabla
Boxeo.plantillaTablaPersonas.pie = `        </tbody>
             </table>
`;


Boxeo.todosLosID = []

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Boxeo.plantillaFormularioPersona = {}

// Cabecera del formulario
Boxeo.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Fecha nacimiento</th><th width="20%">Titulos</th>
            <th width="5%">Victorias</th><th width="5%">Empates</th><th width="5%">Derrotas</th>
            <th width="10%">Categoria</th>
        </thead>
        <tbody>
            <tr title="${Boxeo.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Boxeo.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Boxeo.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-fecha" value="${Boxeo.plantillaTags.FECHA}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-titulos" required value="${Boxeo.plantillaTags.TITULOS}" 
                        name="titulos"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-titulos" required value="${Boxeo.plantillaTags.VICTORIAS}" 
                        name="titulos"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-titulos" required value="${Boxeo.plantillaTags.EMPATES}" 
                        name="titulos"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-titulos" required value="${Boxeo.plantillaTags.DERROTAS}" 
                        name="titulos"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-titulos" required value="${Boxeo.plantillaTags.CATEGORIA}" 
                        name="titulos"/></td>
            </tr>
        </tbody>
    </table>
    <div><a href="javascript:Boxeo.cambiarPersona('${Boxeo.plantillaTags.ID}',1)" class="opcion-secundaria mostrar">Siguiente</a></div>
    <div><a href="javascript:Boxeo.cambiarPersona('${Boxeo.plantillaTags.ID}',-1)" class="opcion-secundaria mostrar">Anterior</a></div>
</form>
`;


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Boxeo.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        console.log(url)
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
Boxeo.mostrarHome = function (datosDescargados) {
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
Boxeo.mostrarAcercaDe = function (datosDescargados) {
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
Boxeo.procesarHome = function () {
    this.descargarRuta("/boxeo/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Boxeo.procesarAcercaDe = function () {
    this.descargarRuta("/boxeo/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Boxeo.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/boxeo/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Boxeo.sustituyeTags = function (plantilla, persona) {
    if(persona === undefined)
        return plantilla
    let fecha = [persona.data.fecha_nacimiento.dia, persona.data.fecha_nacimiento.mes, persona.data.fecha_nacimiento.año]
    return plantilla
        .replace(new RegExp(Boxeo.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Boxeo.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Boxeo.plantillaTags.FECHA, 'g'), fecha)
        .replace(new RegExp(Boxeo.plantillaTags.TITULOS, 'g'), persona.data.titulos)
        .replace(new RegExp(Boxeo.plantillaTags.VICTORIAS, 'g'), persona.data.victorias)
        .replace(new RegExp(Boxeo.plantillaTags.EMPATES, 'g'), persona.data.empates)
        .replace(new RegExp(Boxeo.plantillaTags.DERROTAS, 'g'), persona.data.derrotas)
        .replace(new RegExp(Boxeo.plantillaTags.CATEGORIA, 'g'), persona.data.categoria)

}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Boxeo.plantillaTablaPersonas.actualiza = function (persona) {
    return Boxeo.sustituyeTags(this.cuerpo, persona)
}

/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Boxeo.personaComoFormulario = function (persona) {
    return Boxeo.plantillaFormularioPersona.actualiza(persona);
}

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Boxeo.plantillaFormularioPersona.actualiza = function (persona) {
    return Boxeo.sustituyeTags(this.formulario, persona)
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Boxeo.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj

    if(Boxeo.todosLosID.length <= 1){
        Boxeo.todosLosID.pop()
        vector.forEach( a => { Boxeo.todosLosID.push(a.ref['@ref'].id) } )
    }

    if (Boxeo.ordenarColumnas.id) {
        vector.sort((a, b) => (a.ref['@ref'].id > b.ref['@ref'].id) ? 1 : ((b.ref['@ref'].id > a.ref['@ref'].id) ? -1 : 0))
    }else{
        for (const key in Boxeo.ordenarColumnas) {
            if(Boxeo.ordenarColumnas[key]){
                if(key == "titulos")
                    vector.sort((a, b) => (a.data.titulos.length > b.data.titulos.length) ? 1 : ((b.data.titulos.length > a.data.titulos.length) ? -1 : 0))
                else
                    vector.sort((a, b) => (a.data[key] > b.data[key]) ? 1 : ((b.data[key] > a.data[key]) ? -1 : 0))
            }
        }
    }

    // Compongo el contenido que se va a mostrar dentro de la tabla
    msj = Boxeo.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Boxeo.plantillaTablaPersonas.actualiza(e))
    msj += Boxeo.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Boxeo.recupera = async function (callBackFn) {//NO SE HACE TEST PORQUE LLAMA A UN FUNCION ASINCRONA
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/boxeo/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Boxeo.listar = function () {
    Boxeo.recupera(Boxeo.imprimeMuchasPersonas);
}

/**
 * Función para mostrar en pantalla el nombre todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Boxeo.agregarNombres = function (vector) {
    // se ordenan los nombres
    if (Boxeo.ordenarColumnas.nombre) {
        vector.sort((a, b) => (a.data.nombre > b.data.nombre) ? 1 : ((b.data.nombre > a.data.nombre) ? -1 : 0))
    }
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Boxeo.plantillaSoloNombres.cabecera
    vector.forEach(e => msj += Boxeo.plantillaSoloNombres.cuerpo.replace(new RegExp(Boxeo.plantillaTags.NOMBRE, 'g'), e.data.nombre))
    msj += Boxeo.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres", msj)
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Boxeo.mostrarSoloNombres = function () {//NO SE HACE TEST PORQUE LLAMA A UN FUNCION ASINCRONA
    Boxeo.ordenarColumnas.nombre = !Boxeo.ordenarColumnas.nombre;
    Boxeo.recupera(Boxeo.agregarNombres);
}

Boxeo.ordenarColumna = function(col){
    
    for (const key in Boxeo.ordenarColumnas) {
        if(key == col)
            Boxeo.ordenarColumnas[key] = true
        else
            Boxeo.ordenarColumnas[key] = false
    }

    Boxeo.listar();

}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */
Boxeo.imprimeUnaPersona = function (persona) {
    let msj = Boxeo.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    //Boxeo.almacenaDatos(persona)
} 

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Boxeo.mostrar = function (idPersona) { //NO SE HACE TEST PORQUE LLAMA A UN FUNCION ASINCRONA
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

/**
 * Funciona para mostrar la siguiente o la anterior persona 
 * @param {String} idPersona Identificador de la persona seleccionada
 * @param {Int} idPersona Identificador de la persona seleccionada
 */
Boxeo.cambiarPersona = function (idPersona, cambio) {//NO SE HACE TEST PORQUE LLAMA A UN FUNCION ASINCRONA
    let index = Boxeo.todosLosID.indexOf(idPersona)

    index = (index + cambio) % Boxeo.todosLosID.length
    if(index == -1)
        index=10

    let idSiguientePersona = Boxeo.todosLosID[index]
    this.recuperaUnaPersona(idSiguientePersona, this.imprimeUnaPersona);
}

/**
 * Funcion para crear el buscador
 */
Boxeo.buscar = function (){
    Frontend.Article.actualizar("Mostrar busqueda", buscador)
}

/**
 * Funcion para actulizar la varible donde se guarda la busqueda y obtener el vector de la base de datos
 */
Boxeo.buscarPersonaPorNombre = function(){//NO SE HACE TEST PORQUE LLAMA A UN FUNCION ASINCRONA
    nombreBuscar = document.querySelector('input').value;
    Boxeo.recupera(Boxeo.mostrarPersonaNombreBuscador)
}

/**
 * Funcion para mostrar la lista de personas que coinciden con la busqueda del nombre
 * @param {Vector_de_personas} vector 
 */
Boxeo.mostrarPersonaNombreBuscador = function(vector){
    let personas = []
    //console.log(vector)
    vector.forEach(a => {
        if(a.data.nombre.toLowerCase().includes(nombreBuscar.toLowerCase()))
            personas.push(a)
    })

    let msj = buscador

    // Compongo el contenido que se va a mostrar dentro de la tabla
    msj += Boxeo.plantillaTablaPersonas.cabecera
    personas.forEach(e => msj += Boxeo.plantillaTablaPersonas.actualiza(e))
    msj += Boxeo.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar busqueda", msj)
    
}