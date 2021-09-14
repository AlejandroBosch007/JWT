var express = require('express');
var app = express();
require('dotenv').config()
const sequelize = require('./db/conexion');
const userRoutes = require('./routes/user')

app.use(express.json())
async function serverStart() {
  try {
    await sequelize.authenticate();
    console.log('Conección estabilizada correctamente');
    app.listen(process.env.PORT, function () {
      console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar correctamebte con la Base de datos:', error);
  }
}

serverStart();

//Routes
userRoutes(app)