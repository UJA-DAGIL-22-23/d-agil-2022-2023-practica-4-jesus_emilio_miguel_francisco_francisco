/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)

const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_LISTADO_PERSONAS = "Listado de personas"
const TITULO_LISTADO_NOMBRES = "Listado de nombres"
const TITULO_MOSTRAR_PERSONA = "Mostrar una persona"
const TITULO_BUSCAR = "Mostrar busqueda"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const personaParaPruebas = {
    ref: {
        "@ref":{
            id:"358544981055504985"
        }
    },
    ts: 1678193989710000,
    data: {
        nombre: 'jackie chan',
        fecha_nacimiento: [Object],
        titulos: [Array],
        victorias: 999,
        empates: 888,
        derrotas: 777,
        categoria: 'superpesado'
    }  
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Boxeo.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Boxeo.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Boxeo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Boxeo.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Boxeo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Boxeo.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Boxeo.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Boxeo.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Boxeo.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Boxeo.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Boxeo.sustituyeTags: ", function () {
    it("sustituyo de una plantiya los tags",
        function () {
            Boxeo.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Boxeo.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Boxeo.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Boxeo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Boxeo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Boxeo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Boxeo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Boxeo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Boxeo.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Boxeo.personaComoFormulario: ", () => {
    let plantillaPrueba = {};
    let cuerpo = `
    <tr title="### ID ###">
        <td>### ID ###</td>
        <td>### NOMBRE ###</td>
        <td>### FECHA ###</td>
        <td>### TITULOS ###</td>
        <td>### VICTORIAS ###</td>
        <td>### EMPATES ###</td>
        <td>### DERROTAS ###</td>
        <td>### CATEGORIA ###</td>
        <td>
                    <div><a href="javascript:Boxeo.mostrar('### ID ###')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;
    it("devuelve una plantilla con los atributos cambiados cuando se le pasa una persona", () =>{
        plantillaPrueba = Boxeo.personaComoFormulario(personaParaPruebas);
        //console.log(plantillaPrueba)
        //se comprueba si el nombre esta en la plantilla
        expect(plantillaPrueba.includes(personaParaPruebas.ref['@ref'].id)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.nombre)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.categoria)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.victorias)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.titulos)).toBeTrue();

    })

    it("devuelve una plantilla por defecto si no se le pasa nada como argumento", ()=>{
        plantillaPrueba = Boxeo.personaComoFormulario();
        //console.log(plantillaPrueba)
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.ID)).toBeTrue();
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.NOMBRE)).toBeTrue();
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.CATEGORIA)).toBeTrue();
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.DERROTAS)).toBeTrue();
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.EMPATES)).toBeTrue();
    })
})

describe("Boxeo.plantillaTablaPersonas.actualiza: ", () => {
    it("devuelve una plantilla actualizada si se le pasa una persona", () =>{
        plantillaPrueba = Boxeo.plantillaTablaPersonas.actualiza(personaParaPruebas);
        //Se comprueba si el id está en la plantilla actualizada
       
        expect(plantillaPrueba.includes(personaParaPruebas.ref['@ref'].id)).toBeTrue();
    })

    it("devuelve una plantilla por defecto si no se le pasa nada", () =>{
        plantillaPrueba = Boxeo.plantillaTablaPersonas.actualiza();
        //Se comprueba si el id está en la plantilla actualizada
       
        expect(plantillaPrueba.includes(Boxeo.plantillaTags.ID)).toBeTrue();
    })
})

describe("Boxeo.imprimeMuchasPersonas: ", () =>{
   
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Boxeo.imprimeMuchasPersonas(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_PERSONAS)
    })

    it("Se cambia el contenido del cuerpo", ()=>{ 
        Boxeo.imprimeMuchasPersonas(vector)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.categoria)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.derrotas)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.titulos)).toBeTrue()

    })
})

describe("Boxeo.agregarNombres: ", () =>{
    let cuerpo = '<td style="text-align: center">jackie chan</td>'
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Boxeo.agregarNombres(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
    })

    it("Se cambia el contenido del cuerpo", ()=>{ 
        Boxeo.agregarNombres(vector)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(cuerpo)).toBeTrue()
    })
})

describe("Boxeo.ordenarColumna: ", () =>{
    it("Si se pasa id el id se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('id')
        expect(Boxeo.ordenarColumnas.id).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='id'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('nombre')
        expect(Boxeo.ordenarColumnas.nombre).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='nombre'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa fecha la fecha se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('fecha')
        expect(Boxeo.ordenarColumnas.fecha).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='fecha'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('titulos')
        expect(Boxeo.ordenarColumnas.titulos).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='titulos'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('victorias')
        expect(Boxeo.ordenarColumnas.victorias).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='victorias'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('empates')
        expect(Boxeo.ordenarColumnas.empates).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='empates'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('derrotas')
        expect(Boxeo.ordenarColumnas.derrotas).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='derrotas'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Boxeo.ordenarColumna('categoria')
        expect(Boxeo.ordenarColumnas.categoria).toBeTrue()
        for (const key in Boxeo.ordenarColumnas) {
            if(key!='categoria'){
                expect(Boxeo.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })
})

describe("Boxeo.imprimeUnaPersona: ", () =>{
    it("Se cambia el titulo", ()=>{
        Boxeo.imprimeUnaPersona(personaParaPruebas)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_PERSONA)
    })

    it("Se cambia el contenido del cuerpo si se le pasa una persona", ()=>{
        Boxeo.imprimeUnaPersona(personaParaPruebas)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.categoria)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.victorias)).toBeTrue()
    })

    it("si no se le pasa nada como argumento devuelve una plantilla por defecto", ()=>{
        Boxeo.imprimeUnaPersona()
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(Boxeo.plantillaTags.ID)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(Boxeo.plantillaTags.NOMBRE)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(Boxeo.plantillaTags.CATEGORIA)).toBeTrue()
    })
})

describe("Boxeo.buscar: ", () =>{
    
    it("Se cambia el titulo y se crea un buscador", ()=>{
        Boxeo.buscar()
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes('input type="text"')).toBeTrue()
    })
})

describe("Boxeo.mostrarPersonaNombreBuscador: ", () =>{
    let vector = [personaParaPruebas];
    it("Si se busca 'jack' da como resultada una lista con solamente Jackie Chan ", ()=>{
        nombreBuscar = "jack"
        Boxeo.mostrarPersonaNombreBuscador(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })

    it("Si se busca la cadena vacia da como resultada una lista con todas las personas ", ()=>{
        nombreBuscar = ""
        Boxeo.mostrarPersonaNombreBuscador(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })
})

describe("Boxeo.plantillaFormularioPersona.actualiza", () =>{
    it("Al pasarle una persona devuelve un formulario con los datos de la persona", ()=>{
        let resultado = Boxeo.plantillaFormularioPersona.actualiza(personaParaPruebas)
        expect(resultado.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })
    it("Al pasarle nada devuelve un formulario por defecto", ()=>{
        let resultado = Boxeo.plantillaFormularioPersona.actualiza()
        expect(resultado.includes(Boxeo.plantillaTags.ID)).toBeTrue()
    })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Boxeo.descargarRuta
 - Boxeo.procesarAcercaDe
 - Boxeo.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */