require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();

// Middlewares globales
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load("./swagger/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
const helloRoutes = require("./api/v1/hello");
const saludoRoutes = require("./api/v1/saludo");
const usuariosRoutes = require("./api/v1/usuarios");
const loginRoutes = require("./api/v1/login");

app.use("/api/v1", helloRoutes);
app.use("/api/v1", saludoRoutes);
app.use("/api/v1", usuariosRoutes);
app.use("/api/v1", loginRoutes);

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

module.exports = app; // útil para Vercel o tests
