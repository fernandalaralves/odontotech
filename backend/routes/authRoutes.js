import { Router } from "express";
import { autenticar, cadastro } from "../controllers/authController.js";

const router = Router();

router.post("/login", autenticar);
router.post("/cadastro", cadastro);

export default router;
