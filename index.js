require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Módulos para Swagger UI
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// 👈 NUEVAS IMPORTACIONES DE RUTAS
const helloRoute = require("./api/v1/hello");
const loginRoute = require("./api/v1/login");
const saludoRoute = require("./api/v1/saludo");
const usuariosRoute = require("./api/v1/usuarios");

// Carga el archivo YAML para Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "swagger", "swagger.yaml")
);

const app = express();

// Middlewares globales
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
  });

// 📚 Configuración de la documentación Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🚀 MONTAJE DE RUTAS BAJO /api/v1
// Como cada archivo de ruta usa express.Router(), se montan sin problema.
app.use("/api/v1", helloRoute);
app.use("/api/v1", loginRoute);
app.use("/api/v1", saludoRoute);
app.use("/api/v1", usuariosRoute);

// Ruta base
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando. Visita /api/v1/hello o /docs",
  });
});

module.exports = app;
