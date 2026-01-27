import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
import authRoutes from "./routes/authRoutes.js";

app.use("/api/auth", authRoutes);
