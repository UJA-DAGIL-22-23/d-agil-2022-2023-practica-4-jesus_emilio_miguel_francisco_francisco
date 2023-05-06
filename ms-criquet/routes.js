/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Criquet
 * @author Francisco Javier Jiménez Aznar <fjja0004@ujaen.es>
 * @date 29-abr-2023
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
 * Devuelve todas los jugadores que hay en la BBDD
 */
router.get("/getTodosJugadores", async (req, res) => {
    try {
        await callbacks.getTodosJugadores(req, res)
    } catch (error) {
        console.log(error);
    }
});


// Exporto el módulo para poder usarlo en server
module.exports = router;