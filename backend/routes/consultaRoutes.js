import express from "express";
import {
  listarConsultas,
  criarConsulta,
} from "../controllers/consultaController.js";

const router = express.Router();

// GET /api/consultas
router.get("/", listarConsultas);

// POST /api/consultas
router.post("/", criarConsulta);

export default router;
