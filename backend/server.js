import app from "./app.js";

// IMPORTAÇÃO DAS ROTAS
import authRoutes from "./routes/authRoutes.js";
import dentistaRoutes from "./routes/dentistaRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

const PORT = process.env.PORT || 3000;

// REGISTRO DAS ROTAS
app.use("/api/auth", authRoutes);
app.use("/api/dentistas", dentistaRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);

// INICIALIZA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
