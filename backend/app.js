import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import dentistaRoutes from "./routes/dentistaRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "cadastro.html"));
});

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/dentistas", dentistaRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

export default app;
