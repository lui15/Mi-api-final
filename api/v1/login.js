const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const router = express.Router();

// POST /api/v1/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales incorrectas" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ ok: true, token });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
});

module.exports = router;
