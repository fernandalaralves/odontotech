import express from "express";
import {
  listarPacientes,
  criarPaciente,
} from "../controllers/pacienteController.js";

const router = express.Router();

// GET /api/pacientes
router.get("/", listarPacientes);

// POST /api/pacientes
router.post("/", criarPaciente);

export default router;
