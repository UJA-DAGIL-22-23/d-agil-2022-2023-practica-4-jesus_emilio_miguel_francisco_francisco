/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Obtener todos los jugadores de la BBDD
 */
router.get("/get-todos", async (req, res) => {
    try {
        await callbacks.getTodos(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Obtiene un jugador por su ID
 */
router.get("/getPorId/:idJugador", async (req, res) => {
    try {
        await callbacks.getPorId(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Modifica los campos de un jugador
 */
router.post("/set-cambios", async (req, res) => {
    try {
        await callbacks.setCambios(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Añade un nuevo jugador a la base de datos
 */
router.post("/add-jugador", async (req,res) => {
    try{
        await callbacks.addJugador(req, res)
    } catch (error) {
        console.log(error)
    }
});


/**
 * Elimina un jugador de la base de datos
 */
router.delete("/delete-jugador/:idJugador", async (req,res) => {
    try{
        await callbacks.deleteJugador(req, res)
    } catch (error){
        console.log(error)
    }
});

// Exporto el módulo para poder usarlo en server
module.exports = router;
