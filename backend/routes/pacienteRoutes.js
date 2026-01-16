const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");

router.get("/", (req, res) => pacienteController.listar(req, res));
router.get("/:id", (req, res) => pacienteController.buscar(req, res));
router.post("/", (req, res) => pacienteController.criar(req, res));
router.put("/:id", (req, res) => pacienteController.atualizar(req, res));
router.delete("/:id", (req, res) => pacienteController.excluir(req, res));

module.exports = router;

// ============================================
// backend/routes/dentistaRoutes.js (igual paciente)
// backend/routes/consultaRoutes.js (igual paciente)
// Siga a mesma estrutura para dentistas e consultas
// ============================================
