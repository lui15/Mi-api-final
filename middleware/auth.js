const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // 1. Verificar si existe el header 'Authorization' y empieza con 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Se requiere un token Bearer." });
  }

  // 2. Extraer el token (omite "Bearer ")
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  // 3. Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjuntamos la información del usuario a la request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token no válido o expirado." });
  }
}

module.exports = authMiddleware;
