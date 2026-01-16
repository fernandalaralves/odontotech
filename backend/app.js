const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pacienteRoutes = require("./routes/pacienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/pacientes", pacienteRoutes);
// app.use('/api/dentistas', dentistaRoutes);
// app.use('/api/consultas', consultaRoutes);

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Erro interno do servidor" });
});

module.exports = app;
