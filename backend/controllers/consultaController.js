const consultaService = require("../services/consultaService");
async function listarConsultas(req, res) {
  const consultas = await consultaService.listarConsultas();
  res.json(consultas);
}

async function criarConsulta(req, res) {
  const consulta = await consultaService.criarConsulta(req.body);
  res.status(201).json(consulta);
}

module.exports = {
  listarConsultas,
  criarConsulta,
};
