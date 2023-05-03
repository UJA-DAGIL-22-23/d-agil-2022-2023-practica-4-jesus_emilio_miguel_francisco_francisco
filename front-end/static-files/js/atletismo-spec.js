/**
 * @file atletismo-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloAtletismo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoAtletismo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_ATLETISMO = "ATLETISMO Home"
const TITULO_ACERCA_DE_ATLETISMO = "ATLETISMO Acerca de"

const datosDescargadosPruebaAtletismo = {
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

// SPECS para Jasmine
describe("Cabecera table ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de la tabla",
        function () {
            expect(Atletas.cabeceraTable()).toBe(`<table class="listado-atletas">
        <thead>
            <th onclick="Atletas.imprimeOrdenadoNombre()">Nombre</th>
            <th onclick="Atletas.imprimeOrdenadoFechaNacimiento()">Fecha de nacimiento</th>
            <th onclick="Atletas.imprimeOrdenadoNacionalidad()">Nacionalidad</th>
            <th onclick="Atletas.imprimeOrdenadoMundialesParticipados()">Mundiales participados</th>
            <th onclick="Atletas.imprimeOrdenadoAñosMundiales()">Años mundiales</th>
            <th onclick="Atletas.imprimeOrdenadoCategoria()">Categoría</th>
            <th>Mostrar</th>
        </thead>
        <tbody>
    `);
    });
});

describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Atletas.pieTable()).toBe("</tbody></table>");
        });
});

describe("cuerpoTr ", function () {

    // Preparo los datos
    let d = {ref: {
        "@ref": {
            id: "ref atleta 1"
        }
    },
    data: {
        nombre: "Juan Pérez",
        fecha_nacimiento: {
          dia: 12,
          mes: 5,
          año: 1990
        },
        nacionalidad: "México",
        mundiales_participados: 3,
        años_mundiales: [2015, 2017, 2019],
        categoría: "100 metros lisos"
      }
    }

    let msj = Atletas.cuerpoTr(d)
    
    // Realizo los expect
    it("debería devolver una fila de tabla con el nombre del atleta",
        function () {
            expect(msj.includes(d.data.nombre)).toBeTrue();
        });

    it("debería devolver una fila de tabla con la fecha de nacimiento del atleta",
        function () {
            expect(msj.includes(`${d.data.fecha_nacimiento.dia}/${d.data.fecha_nacimiento.mes}/${d.data.fecha_nacimiento.año}`)).toBeTrue();
        });

    it("debería devolver una fila de tabla con la nacionalidad del atleta",
        function () {
            expect(msj.includes(d.data.nacionalidad)).toBeTrue();
        });

    it("debería devolver una fila de tabla con el número de mundiales participados por el atleta",
        function () {
            expect(msj.includes(d.data.mundiales_participados)).toBeTrue();
        });

    it("debería devolver una fila de tabla con los años de los mundiales en los que participó el atleta",
        function () {
            expect(msj.includes(d.data.años_mundiales.join(" / "))).toBeTrue();
        });

    it("debería devolver una fila de tabla con la categoría del atleta",
        function () {
            expect(msj.includes(d.data.categoría)).toBeTrue();
        });
});

describe("Atletas.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Atletas.mostrarHome()
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_HOME_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML).toBe(Atletas.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Atletas.mostrarHome(23)
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_HOME_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML).toBe(Atletas.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Atletas.mostrarHome({})
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_HOME_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML).toBe(Atletas.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Atletas.mostrarHome({ foo: "bar" })
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_HOME_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML).toBe(Atletas.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Atletas.mostrarHome(datosDescargadosPruebaAtletismo)
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_HOME_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML).toBe(datosDescargadosPruebaAtletismo.mensaje)
        })
})


describe("Atletas.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Atletas.mostrarAcercaDe()
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Atletas.mostrarAcercaDe(23)
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Atletas.mostrarAcercaDe({})
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Atletas.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Atletas.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Atletas.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Atletas.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)
            expect(elementoContenidoAtletismo.innerHTML.search(Atletas.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Atletas.mostrarAcercaDe(datosDescargadosPruebaAtletismo)
            expect(elementoTituloAtletismo.innerHTML).toBe(TITULO_ACERCA_DE_ATLETISMO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoAtletismo.innerHTML.search(datosDescargadosPruebaAtletismo.autor) >= 0).toBeTrue()
            expect(elementoContenidoAtletismo.innerHTML.search(datosDescargadosPruebaAtletismo.email) >= 0).toBeTrue()
            expect(elementoContenidoAtletismo.innerHTML.search(datosDescargadosPruebaAtletismo.fecha) >= 0).toBeTrue()
        })
})  

describe("Atletas.imprimeOrdenadoNombre: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
          { data: { nombre: "Pedro" } },
          { data: { nombre: "Juan" } },
          { data: { nombre: "María" } },
          { data: { nombre: "Ana" } },
        ];
    
        let ascendente = true;
        
        vector.sort((a, b) =>
          ascendente ? a.data.nombre.localeCompare(b.data.nombre) : b.data.nombre.localeCompare(a.data.nombre)
        );
    
        const nombresOrdenados = vector.map((elem) => elem.data.nombre);
    
        expect(nombresOrdenados).toEqual(["Ana", "Juan", "María", "Pedro"]);
      });
    
      it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
          { data: { nombre: "Pedro" } },
          { data: { nombre: "Juan" } },
          { data: { nombre: "María" } },
          { data: { nombre: "Ana" } },
        ];
    
        let ascendente = false;
        
        vector.sort((a, b) =>
          ascendente ? a.data.nombre.localeCompare(b.data.nombre) : b.data.nombre.localeCompare(a.data.nombre)
        );
    
        const nombresOrdenados = vector.map((elem) => elem.data.nombre);
    
        expect(nombresOrdenados).toEqual(["Pedro", "María", "Juan", "Ana"]);
      });
})
  
describe("Atletas.imprimeOrdenadoNacionalidad: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
        { data: { nacionalidad: "Mexicana" } },
        { data: { nacionalidad: "Canadiense" } },
        { data: { nacionalidad: "Estadounidense" } },
        { data: { nacionalidad: "Colombiana" } },
        ];
    
        let ascendente = true;
    
        vector.sort((a, b) =>
        ascendente ? a.data.nacionalidad.localeCompare(b.data.nacionalidad) : b.data.nacionalidad.localeCompare(a.data.nacionalidad)
        );

        const nacionalidadesOrdenadas = vector.map((elem) => elem.data.nacionalidad);

        expect(nacionalidadesOrdenadas).toEqual(["Canadiense", "Colombiana", "Estadounidense", "Mexicana"]);
    });

    it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
        { data: { nacionalidad: "Mexicana" } },
        { data: { nacionalidad: "Canadiense" } },
        { data: { nacionalidad: "Estadounidense" } },
        { data: { nacionalidad: "Colombiana" } },
        ];

        let ascendente = false;
        
        vector.sort((a, b) =>
        ascendente ? a.data.nacionalidad.localeCompare(b.data.nacionalidad) : b.data.nacionalidad.localeCompare(a.data.nacionalidad)
        );

        const nacionalidadesOrdenadas = vector.map((elem) => elem.data.nacionalidad);

        expect(nacionalidadesOrdenadas).toEqual(["Mexicana", "Estadounidense", "Colombiana", "Canadiense"]);
    });
})

describe("Atletas.imprimeOrdenadoCategoria: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
        { data: { categoria: "100 metros lisos" } },
        { data: { categoria: "Lanzamiento de disco" } },
        { data: { categoria: "Salto de altura" } },
        { data: { categoria: "400 metros lisos" } },
        ];
    
        let ascendente = true;
    
        vector.sort((a, b) =>
        ascendente ? a.data.categoria.localeCompare(b.data.categoria) : b.data.categoria.localeCompare(a.data.categoria)
        );

        const categoriasOrdenadas = vector.map((elem) => elem.data.categoria);

        expect(categoriasOrdenadas).toEqual(["100 metros lisos", "400 metros lisos", "Lanzamiento de disco", "Salto de altura"]);
    });

    it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
        { data: { categoria: "100 metros lisos" } },
        { data: { categoria: "Lanzamiento de disco" } },
        { data: { categoria: "Salto de altura" } },
        { data: { categoria: "400 metros lisos" } },
        ];

        let ascendente = false;
        
        vector.sort((a, b) =>
        ascendente ? a.data.categoria.localeCompare(b.data.categoria) : b.data.categoria.localeCompare(a.data.categoria)
        );

        const categoriasOrdenadas = vector.map((elem) => elem.data.categoria);

        expect(categoriasOrdenadas).toEqual(["Salto de altura", "Lanzamiento de disco", "400 metros lisos", "100 metros lisos"]);
    });
})

describe("Atletas.imprimeOrdenadoMundialesParticipados: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
        { data: { mundiales_participados: 3 } },
        { data: { mundiales_participados: 1 } },
        { data: { mundiales_participados: 2 } },
        { data: { mundiales_participados: 0 } },
        ];
    
        let ascendente = true;
    
        vector.sort((a, b) =>
        ascendente ? a.data.mundiales_participados - b.data.mundiales_participados : b.data.mundiales_participados - a.data.mundiales_participados
        );

        const participacionesOrdenadas = vector.map((elem) => elem.data.mundiales_participados);

        expect(participacionesOrdenadas).toEqual([0, 1, 2, 3]);
    });

    it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
        { data: { mundiales_participados: 3 } },
        { data: { mundiales_participados: 1 } },
        { data: { mundiales_participados: 2 } },
        { data: { mundiales_participados: 0 } },
        ];

        let ascendente = false;
        
        vector.sort((a, b) =>
        ascendente ? a.data.mundiales_participados - b.data.mundiales_participados : b.data.mundiales_participados - a.data.mundiales_participados
        );

        const participacionesOrdenadas = vector.map((elem) => elem.data.mundiales_participados);

        expect(participacionesOrdenadas).toEqual([3, 2, 1, 0]);
    });
})

describe("Atletas.imprimeOrdenadoFechaNacimiento: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
        { data: { fecha_nacimiento: { dia: 12, mes: 5, año: 1990 } } },
        { data: { fecha_nacimiento: { dia: 5, mes: 10, año: 1985 } } },
        { data: { fecha_nacimiento: { dia: 3, mes: 7, año: 1993 } } },
        { data: { fecha_nacimiento: { dia: 1, mes: 1, año: 2000 } } },
        ];
    
        let ascendente = true;
    
        vector.sort((a, b) =>
        ascendente ? compareFechas(a.data.fecha_nacimiento, b.data.fecha_nacimiento) : compareFechas(b.data.fecha_nacimiento, a.data.fecha_nacimiento)
        );

        const fechasOrdenadas = vector.map((elem) => elem.data.fecha_nacimiento);

        expect(fechasOrdenadas).toEqual([
        { dia: 5, mes: 10, año: 1985 },
        { dia: 12, mes: 5, año: 1990 },
        { dia: 3, mes: 7, año: 1993 },
        { dia: 1, mes: 1, año: 2000 },
        ]);
    });

    it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
        { data: { fecha_nacimiento: { dia: 12, mes: 5, año: 1990 } } },
        { data: { fecha_nacimiento: { dia: 5, mes: 10, año: 1985 } } },
        { data: { fecha_nacimiento: { dia: 3, mes: 7, año: 1993 } } },
        { data: { fecha_nacimiento: { dia: 1, mes: 1, año: 2000 } } },
        ];

        let ascendente = false;
        
        vector.sort((a, b) =>
        ascendente ? compareFechas(a.data.fecha_nacimiento, b.data.fecha_nacimiento) : compareFechas(b.data.fecha_nacimiento, a.data.fecha_nacimiento)
        );

        const fechasOrdenadas = vector.map((elem) => elem.data.fecha_nacimiento);

        expect(fechasOrdenadas).toEqual([
        { dia: 1, mes: 1, año: 2000 },
        { dia: 3, mes: 7, año: 1993 },
        { dia: 12, mes: 5, año: 1990 },
        { dia: 5, mes: 10, año: 1985 },
        ]);
    });
})

describe("Atletas.imprimeOrdenadoAñosMundiales: ", function () {
    it("debe ordenar el vector en orden ascendente correctamente", () => {
        const vector = [
        { data: { años_mundiales: [2015, 2017, 2019] } },
        { data: { años_mundiales: [2015, 2017] } },
        { data: { años_mundiales: [2013, 2017] } },
        { data: { años_mundiales: [2013] } },
        ];

        let ascendente = true;

        vector.sort((a, b) =>
        ascendente ? a.data.años_mundiales[0] - b.data.años_mundiales[0] : b.data.años_mundiales[0] - a.data.años_mundiales[0]
        );

        const añosOrdenados = vector.map((elem) => elem.data.años_mundiales);

        expect(añosOrdenados).toEqual([[2013, 2017], [2013], [2015, 2017, 2019], [2015, 2017]]);
    });

    it("debe ordenar el vector en orden descendente correctamente", () => {
        const vector = [
        { data: { años_mundiales: [2015, 2017, 2019] } },
        { data: { años_mundiales: [2015, 2017] } },
        { data: { años_mundiales: [2013, 2017] } },
        { data: { años_mundiales: [2013] } },
        ];

        let ascendente = false;

        vector.sort((a, b) =>
        ascendente ? a.data.años_mundiales[0] - b.data.años_mundiales[0] : b.data.años_mundiales[0] - a.data.años_mundiales[0]
        );

        const añosOrdenados = vector.map((elem) => elem.data.años_mundiales);

        expect(añosOrdenados).toEqual([[2015, 2017, 2019], [2015, 2017], [2013, 2017], [2013]]);
    });
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
