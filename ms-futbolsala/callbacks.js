/**
 * @file callbacks.js
 * @description Callbacks para el MS Plantilla.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAFBBEYfHAAzGtp0T2MZJMP3nGu_j37PzVIj7HB',
});

const COLLECTION = "Jugadores"

// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
    /**
     * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * Método para obtener todas los jugadores de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getTodos: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            //console.log( personas ) // Para comprobar qué se ha devuelto en personas
            CORS(res)
                .status(200)
                .json(personas)
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
    * Método para obtener un jugador de la BBDD a partir de su ID
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    getPorId: async (req, res) => {
        try {
            //console.log( "getPorId req", req.params.idJugador ) // req.params contiene todos los parámetros de la llamada
            let jugador = await client.query(
                q.Get(q.Ref(q.Collection(COLLECTION), req.params.idJugador))
            )
            //console.log( jugador ) // Para comprobar qué se ha devuelto en jugador
            CORS(res)
                .status(200)
                .json(jugador)
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
    * Método para cambiar los datos de un jugador
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    setCambios: async (req, res) => {
        //console.log("setTodo req.body", req) // req.body contiene todos los parámetros de la llamada
        try {
            let valorDevuelto = {}
            // Hay que comprobar Object.keys(req.body).length para saber si req.body es objeto "normal" o con problemas
            // Cuando la llamada viene de un formulario, se crea una sola entrada, con toda la info en una sola key y el value está vacío.
            // Cuando la llamada se hace con un objeto (como se hace desde el server-spec.js), el value No está vacío.
            let data = (Object.values(req.body)[0] === '') ? JSON.parse(Object.keys(req.body)[0]) : req.body
            let jugador = await client.query(
                q.Update(
                    q.Ref(q.Collection(COLLECTION), data.id_jugador),
                    {
                        data: {
                            nombre: data.nombre_jugador,
                            apellidos: data.apellidos_jugador,
                            apodo: data.apodo_jugador,
                            fecha_nacimiento: data.fecha_nacimiento_jugador,
                            dorsal: data.dorsal_jugador,
                            posicion: data.posicion_jugador,
                            equipos_jugados: data.equipos_jugados,
                        },
                    },
                )
            )
                .then((ret) => {
                    valorDevuelto = ret
                    //console.log("Valor devuelto ", valorDevuelto)
                    CORS(res)
                        .status(200)
                        .header('Content-Type', 'application/json')
                        .json(valorDevuelto)
                })

        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
    * Método para añadir un jugador a la base de datos
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    addJugador: async (req, res) => {

        try {
            let data = (Object.values(req.body)[0] === '') ? JSON.parse(Object.keys(req.body)[0]) : req.body
            let jugador = await client.query(
                q.Create(
                    q.Collection(COLLECTION),
                    {
                        data: data
                    },
                ),
            )

            //console.log(jugador)

            CORS(res)
                .status(200)
                .json(jugador)

        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
    * Método para eliminar un jugador a la base de datos
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    deleteJugador: async (req, res) => {
        try {
            //console.log( "deleteJugador req", req.params.idJugador ) // req.params contiene todos los parámetros de la llamada
            let jugador = await client.query(
                q.Delete(q.Ref(q.Collection(COLLECTION), req.params.idJugador))
            )
            //console.log(jugador) // Para comprobar qué se ha devuelto en jugador
            CORS(res)
                .status(200)
                .json(jugador)
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

}



// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            CORS(res).status(200).json({ mensaje: "Microservicio MS Plantilla: home" });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            CORS(res).status(200).json({
                mensaje: "Microservicio FÚTBOL SALA: acerca de",
                autor: "Francisco José Jordán Jiménez",
                email: "fjjj0001@red.ujaen.es",
                fecha: "08/04/2023"
            });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
