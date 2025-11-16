const express = require("express");
const User = require("../../models/user");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

// Protegido con authMiddleware
router.get("/usuarios", authMiddleware, async (req, res) => {
  try {
    const usuarios = await User.find({}, "-password"); // no enviamos el password
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

module.exports = router;
