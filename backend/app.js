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

//  __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

//  SERVIR FRONTEND (RAIZ DO PROJETO)
const publicPath = path.resolve(__dirname, "..");
console.log("Frontend servido em:", publicPath);

app.use(express.static(publicPath));

//  LOGIN PADRÃO
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/dentistas", dentistaRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
});

export default app;
