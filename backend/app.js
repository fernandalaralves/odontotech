import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import dentistaRoutes from "./routes/dentistaRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "cadastro.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/dentistas", dentistaRoutes);
app.use("/api/consultas", consultaRoutes);

app.get("/api/health", (_, res) => res.json({ status: "OK" }));

export default app;
