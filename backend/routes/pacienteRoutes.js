// ============================================
// backend/routes/pacienteRoutes.js
// ============================================

const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.get("/", pacienteController.listarTodos);
router.get("/search", pacienteController.buscar);
router.get("/:id", pacienteController.buscarPorId);
router.post("/", pacienteController.criar);
router.put("/:id", pacienteController.atualizar);
router.delete("/:id", pacienteController.excluir);

module.exports = router;
