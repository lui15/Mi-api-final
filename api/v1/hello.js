const express = require("express");
const router = express.Router();

// GET /api/v1/hello
router.get("/hello", (req, res) => {
  return res.json({ ok: true, message: "Hola Mundo" });
});

module.exports = router;
