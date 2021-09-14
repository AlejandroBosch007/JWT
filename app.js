//Importamos los modulos requeridos
var express = require('express');
var app = express();
require('dotenv').config()
const sequelize = require('./db/conexion');
const cors = require('cors')
const usuariosRoutes = require('./routes/usuarios.routes')
const midd = require('./middlewares/midd.usuario')

//Middlewares globales
app.use(express.json())
app.use(cors())
app.use(midd.limiter);

//iniciamos nuestro servidor
async function inicioServer() {
    try {
        await sequelize.authenticate();
        console.log('Conección estabilizada correctamente');
        app.listen(process.env.PORT, function () {
            console.log(`Sistema iniciado en htt://${process.env.HOST}:${process.env.PORT}`);
        });
      } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
      }
}

inicioServer();

//Routes
usuariosRoutes(app)