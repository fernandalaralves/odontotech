import express from "express";
import {
  listarDentistas,
  criarDentista,
} from "../controllers/dentistaController.js";

const router = express.Router();

// GET /api/dentistas
router.get("/", listarDentistas);

// POST /api/dentistas
router.post("/", criarDentista);

export default router;
