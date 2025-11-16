const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const router = express.Router();

// Ejemplo simple: login por email + password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // En un proyecto serio se debe usar password hasheada y comparar con bcrypt
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      nombre: user.nombre,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
