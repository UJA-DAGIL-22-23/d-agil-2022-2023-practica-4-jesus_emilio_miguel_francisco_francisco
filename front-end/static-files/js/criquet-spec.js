/**
 * @file criquet-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Criquet en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloCriquet = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoCriquet = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_CRIQUET = "Criquet Home"
const TITULO_ACERCA_DE_CRIQUET = "Criquet Acerca de"

const datosDescargadosPruebaCriquet = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
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

describe("Criquet.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Criquet.mostrarHome()
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_HOME_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML).toBe(Criquet.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Criquet.mostrarHome(23)
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_HOME_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML).toBe(Criquet.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Criquet.mostrarHome({})
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_HOME_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML).toBe(Criquet.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Criquet.mostrarHome({ foo: "bar" })
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_HOME_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML).toBe(Criquet.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Criquet.mostrarHome(datosDescargadosPruebaCriquet)
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_HOME_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML).toBe(datosDescargadosPruebaCriquet.mensaje)
        })
})


describe("Criquet.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Criquet.mostrarAcercaDe()
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Criquet.mostrarAcercaDe(23)
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Criquet.mostrarAcercaDe({})
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Criquet.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Criquet.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Criquet.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Criquet.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)
            expect(elementoContenidoCriquet.innerHTML.search(Criquet.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Criquet.mostrarAcercaDe(datosDescargadosPruebaCriquet)
            expect(elementoTituloCriquet.innerHTML).toBe(TITULO_ACERCA_DE_CRIQUET)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoCriquet.innerHTML.search(datosDescargadosPruebaCriquet.autor) >= 0).toBeTrue()
            expect(elementoContenidoCriquet.innerHTML.search(datosDescargadosPruebaCriquet.email) >= 0).toBeTrue()
            expect(elementoContenidoCriquet.innerHTML.search(datosDescargadosPruebaCriquet.fecha) >= 0).toBeTrue()
        })
})

describe("Criquet.cabeceraTable: ", function () {

    it("muestra los nombres de los diferentes campos de la cabecera de la tabla en HTML",
        function () {
            expect(Criquet.cabeceraTable()).toBe(`<table class="listado-jugadores">
        <thead>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Posición</th>
            <th>Estadísticas</th>
            <th>Historial de equipos</th>
            <th>Nacionalidad</th>
            <th>Fecha de nacimiento</th>
            <th>Peso</th>
            <th>Altura</th>
        </thead>
        <tbody>
    `);
        });
});

describe("Criquet.cuerpoTr ", function () {

    //Datos
    let d = {
        ref: {
            "@ref": {
                id: "ref jugador 1"
            }
        },
        data: {
            nombre: "Wayne Madsen",
            edad: 33,
            posicion: "Batsman",
            estadisticas: {
                partidosJugados: 80,
                puntuacionPromedio: 38.7,
                puntuacionMaxima: 95,
                puntuacionMinima: 5
            },
            historialEquipos: [
                "Wellington Wizards",
                "Lahore Lions"
            ],
            nacionalidad: "Australia",
            fechaNacimiento: "1990-03-15",
            peso: 80.2,
            altura: 1.85
        }
    }

    let msj = Criquet.cuerpoTr(d)

    //Expect
    it("muestra una fila de tabla con el nombre del jugador",
        function () {
            expect(msj.includes(d.data.nombre)).toBeTrue();
        });

    it("muestra una fila de tabla con la edad del jugador",
        function () {
            expect(msj.includes(d.data.edad)).toBeTrue();
        });

    it("muestra una fila de tabla con la posición del jugador",
        function () {
            expect(msj.includes(d.data.posicion)).toBeTrue();
        });

    it("muestra una fila de tabla con las estadísticas del jugador",
        function () {
            expect(msj.includes(`Partidos Jugados: ${d.data.estadisticas.partidosJugados} / Puntuación Promedio: ${d.data.estadisticas.puntuacionPromedio} / Puntuación Máxima: ${d.data.estadisticas.puntuacionMaxima} / Puntuación Mínima: ${d.data.estadisticas.puntuacionMinima}`)).toBeTrue();
        });

    it("muestra una fila de tabla con el historial de equipos del jugador",
        function () {
            expect(msj.includes(d.data.historialEquipos.join(" / "))).toBeTrue();
        });

    it("muestra una fila de tabla con la nacionalidad del jugador",
        function () {
            expect(msj.includes(d.data.nacionalidad)).toBeTrue();
        });

    it("muestra una fila de tabla con la fecha de nacimiento del jugador",
        function () {
            expect(msj.includes(d.data.fechaNacimiento)).toBeTrue();
        });

    it("muestra una fila de tabla con el peso del jugador",
        function () {
            expect(msj.includes(d.data.peso)).toBeTrue();
        });

    it("muestra una fila de tabla con la altura del jugador",
        function () {
            expect(msj.includes(d.data.altura)).toBeTrue();
        });
});

describe("Criquet.pieTable", function () {
    it("muestra las etiquetas HTML para el pie de tabla",
        function () {
            expect(Criquet.pieTable()).toBe("</tbody></table>");
        });
});


/**
 * Los test de esta función incluyen también a la función Criquet.compare
 */
describe("Criquet.ordenarAlfabeticamente: ", function () {
    it("ordena el vector en orden alfabético correctamente", () => {
        const vector = [
          { data: { nombre: "Wayne" } },
          { data: { nombre: "Liam" } },
          { data: { nombre: "Sofia" } },
          { data: { nombre: "George" } },
          { data: { nombre: "Billy" } },
        ];

        let alfabetico = true;
        vector.sort((a, b) =>
          alfabetico ? a.data.nombre.localeCompare(b.data.nombre) : b.data.nombre.localeCompare(a.data.nombre)
        );

        const nombresOrdenados = vector.map((elem) => elem.data.nombre);
        expect(nombresOrdenados).toEqual(["Billy", "George", "Liam", "Sofia", "Wayne"]);
      });
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Criquet.descargarRuta
 - Criquet.procesarAcercaDe
 - Criquet.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
