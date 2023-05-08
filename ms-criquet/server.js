/**
 * @file server.js
 * @description Define el servidor que aceptará las peticiones para esta aplicación.
 * @author Francisco Javier Jiménez Aznar <fjja0004@ujaen.es>
 * @date 29-abr-2023
 */
const express = require("express")
const app = express()

// Necesario para poder obtener los datos en las llamadas POST
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Necesario para gestionar el conjunto de callbacks para las distintas funciones REST
const routes = require("./routes")
app.use("/", routes);




const port = 8004;
app.listen(port, () => {
    console.log(`Microservicio CRIQUET ejecutándose en puerto ${port}!`);
});


module.exports = app
