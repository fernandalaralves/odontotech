const pacienteService = require("../services/pacienteService");

async function listarPacientes(req, res) {
  const pacientes = await pacienteService.listarPacientes();
  res.json(pacientes);
}
async function criarPaciente(req, res) {
  const paciente = await pacienteService.criarPaciente(req.body);
  res.status(201).json(paciente);
}
module.exports = {
  listarPacientes,
  criarPaciente,
};
