const express = require("express");
const router = express.Router();

// /api/v1/saludo/:nombre
router.get("/saludo/:nombre", (req, res) => {
  const { nombre } = req.params;
  return res.json({ message: `Hola, ${nombre}!` });
});

module.exports = router;
