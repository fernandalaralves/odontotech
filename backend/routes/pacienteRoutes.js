import express from "express";
import consultaController from "../controllers/pacienteController.js";

const router = express.Router();
router.post("/", (req, res) => pacienteController.agendarConsulta(req, res));
router.get("/:id", (req, res) => pacienteController.obterConsulta(req, res));
router.put("/:id", (req, res) =>
  consultaController.atualizarConsulta(req, res),
);
router.delete("/:id", (req, res) =>
  consultaController.cancelarConsulta(req, res),
);
export default router;
