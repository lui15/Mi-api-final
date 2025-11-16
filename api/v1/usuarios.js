const express = require("express");
const User = require("../../models/User");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.get("/usuarios", authMiddleware, async (req, res) => {
  try {
    const usuarios = await User.find({}, "-password");

    return res.json({
      ok: true,
      usuarios: usuarios,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error al obtener usuarios" });
  }
});

module.exports = router;
