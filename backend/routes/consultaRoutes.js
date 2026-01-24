import express from "express";
import consultaController from "../controllers/consultaController.js";

const router = express.Router();
router.post("/", (req, res) => consultaController.agendarConsulta(req, res));
router.get("/:id", (req, res) => consultaController.obterConsulta(req, res));
router.put("/:id", (req, res) =>
  consultaController.atualizarConsulta(req, res),
);
router.delete("/:id", (req, res) =>
  consultaController.cancelarConsulta(req, res),
);
export default router;
