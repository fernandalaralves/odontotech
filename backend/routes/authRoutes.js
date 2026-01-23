import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/cadastro", (req, res) => authController.cadastro(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;

//PADRAO DE TODOS OS ROUTES
