const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ success: true, message: "Login route" });
});

router.post("/cadastro", (req, res) => {
  res.json({ success: true, message: "Cadastro route" });
});

module.exports = router;
