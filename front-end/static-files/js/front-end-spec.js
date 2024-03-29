/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// Constantes
const TITULO_TODOS_ACERCA_DE = "Datos de los estudiantes"

const datosFrontend = {
    mensaje: "Microservicio Frontend: acerca de",
    autor: "Francisco Javier Jiménez Aznar",
    email: "fjja0004@red.ujaen.es",
    fecha: "Abril de 2023"
}

const datosFsala = {
    mensaje: "Microservicio FÚTBOL SALA: acerca de",
    autor: "Francisco José Jordán Jiménez",
    email: "fjjj0001@red.ujaen.es",
    fecha: "08/04/2023"
}

const datosTenis = {
    mensaje: "Microservicio TENIS: acerca de",
    autor: "Miguel Ángel Hurtado Molina",
    email: "mahm0010@red.ujaen.es",
    fecha: "09/04/2023"
}

const datosAtletismo = {
    mensaje: "Microservicio ATLETISMO: acerca de",
    autor: "Emilio Martínez Conchillo",
    email: "emc00073@red.ujaen.es",
    fecha: "10/04/2023"
}

const datosBoxeo = {
    mensaje: "Microservicio BOXEO: acerca de",
    autor: "Jesús Morales Villegas",
    email: "jmv00037@red.ujaen.es",
    fecha: new Date().toLocaleDateString("en-US")
}

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})

describe("Frontend.Article.añadirContenido: ", function () {
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const contenidoPrueba = "Contenido de prueba"
    it("Para contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Borramos lo que haya de antes
            elementoContenido.innerHTML = ""

            // Probamos valores nulos
            Frontend.Article.añadirContenido(null)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.añadirContenido("")
            expect(elementoContenido.innerHTML).toBe("")
        })

    it("Para contenidos no nulos, debe añadir el contenido a la correspondiente zona del article",
        function () {
            // Borramos lo que haya de antes
            elementoContenido.innerHTML = ""

            // Probamos valores normales
            Frontend.Article.añadirContenido(contenidoPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })

})

describe("Frontend.mostrarTodosAcercaDe: ", function () {
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    it("Se muestra correctamente el título",
        function () {
            Frontend.mostrarTodosAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_TODOS_ACERCA_DE)            
        })

})

describe("Frontend.cabeceraTableNombres: ", function () {

    it("muestra los nombres de los diferentes campos de la cabecera de la tabla en HTML",
        function () {
            expect(Frontend.cabeceraTableNombres()).toBe(`<table class="listado-jugadores">
        <thead style="cursor: pointer;" onClick="Frontend.ordenar()" >
            <th>Nombre</th>
        </thead>
        <tbody>
    `);
        });
});

describe("Frontend.cuerpoTrNombres ", function () {

    //Datos
    let d = {
        ref: {
            "@ref": {
                id: "ref jugador 1"
            }
        },
        data: {
            nombre: "Wayne Madsen",
        }
    }

    let msj = Frontend.cuerpoTrNombres(d)

    //Expect
    it("muestra una fila de tabla con el nombre del jugador",
        function () {
            expect(msj.includes(d.data.nombre)).toBeTrue();
        });
});

describe("Frontend.cabeceraTableFiltrados: ", function () {

    it("muestra los nombres y el deporte de los diferentes campos de la cabecera de la tabla en HTML",
        function () {
            expect(Frontend.cabeceraTableFiltrados()).toBe(`<table class="listado-jugadores">
        <div>
            <label for="filtrado">Filtrar:</label>
            <input class="busqueda" type="text" id="filtrado" name="filtrado">
            <button class="opcion-principal" onclick="Frontend.procesarFiltrarDeportistas()">Filtrar</button>
        </div>
        <br></br>
        <thead>
            <th>Nombre</th>
            <th>Deporte</th>
        </thead>
        <tbody>
    `);
        });
});

describe("Frontend.cuerpoTrFiltrados ", function () {

    //Datos
    let d = {
        ref: {
            "@ref": {
                id: "ref jugador 1"
            }
        },
        data: {
            nombre: "Wayne Madsen",
        }
    }

    const deportista = {
        deporte: "Criquet"
    };

    // Copia todos los atributos de la persona al deportista
    Object.assign(deportista, d);

    let msj = Frontend.cuerpoTrFiltrados(deportista)

    //Expect
    it("muestra una fila de tabla con el nombre del jugador",
        function () {
            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(deportista.deporte)).toBeTrue();
        });
});

describe("Frontend.pieTable", function () {
    it("muestra las etiquetas HTML para el pie de tabla",
        function () {
            expect(Frontend.pieTable()).toBe("</tbody></table>");
        });        
});

describe('Frontend.mostrarOpcionesPulsadas', function() {
    beforeEach(function() {
        // Configurar el estado inicial de la cola
        opcionesSeleccionadasPrueba = new Cola(5);
        opcionesSeleccionadasPrueba.encolar('Opción 1');
        opcionesSeleccionadasPrueba.encolar('Opción 2');
        opcionesSeleccionadasPrueba.encolar('Opción 3');
    });
    
    it('debería construir una tabla HTML con los elementos de la cola', function() {
        Frontend.mostrarOpcionesPulsadas(opcionesSeleccionadasPrueba);
    
        const contenidoActual = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML;
    
        expect(contenidoActual).toContain('<table class="listado-jugadores">');
        expect(contenidoActual).toContain('<th>Número</th><th>Opción</th>');
        expect(contenidoActual).toContain('<td>1</td><td>Opción 1</td>');
        expect(contenidoActual).toContain('<td>2</td><td>Opción 2</td>');
        expect(contenidoActual).toContain('<td>3</td><td>Opción 3</td>');
    });
    
    it('debería llamar al método Frontend.Article.actualizar con los parámetros correctos', function() {
        spyOn(Frontend.Article, 'actualizar');
    
        Frontend.mostrarOpcionesPulsadas(opcionesSeleccionadasPrueba);
    
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Opciones pulsadas', jasmine.any(String));
    });
});