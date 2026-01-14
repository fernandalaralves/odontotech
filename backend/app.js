// ============================================
// backend/app.js - Configuração do Express
// ============================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Importar rotas
const authRoutes = require("./routes/authRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const dentistaRoutes = require("./routes/dentistaRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const prontuarioRoutes = require("./routes/prontuarioRoutes");
const pagamentoRoutes = require("./routes/pagamentoRoutes");

// Importar middlewares
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/dentistas", dentistaRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/prontuarios", prontuarioRoutes);
app.use("/api/pagamentos", pagamentoRoutes);

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API está funcionando!" });
});

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
