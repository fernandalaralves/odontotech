const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/health\n`);
});
