require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Módulos para Swagger UI
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Importaciones de Rutas (desde la carpeta api/v1)
const helloRoute = require("./api/v1/hello");
const loginRoute = require("./api/v1/login");
const saludoRoute = require("./api/v1/saludo");
const usuariosRoute = require("./api/v1/usuarios");

// 🚨 CORRECCIÓN DEL PATH DE SWAGGER (asumiendo que está en /swagger/swagger.yaml)
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

    // --- INICIO DE CONFIGURACIÓN DEL SERVIDOR ---

    // 📚 Configuración de la documentación Swagger UI
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // 🚀 MONTAJE DE RUTAS BAJO /api/v1
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

    // 🚨 CÓDIGO FALTANTE: INICIAR EL SERVIDOR EXPRESS
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    });
  }) // Fin del .then()
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
  });

// module.exports = app; // Puedes comentar o quitar esta línea si usas app.listen()
