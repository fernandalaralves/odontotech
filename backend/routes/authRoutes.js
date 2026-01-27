import express from "express";
import { autenticar } from "../controllers/authController.js";

const router = express.Router();

// Rota de login
router.post("/login", autenticar);

export default router;
