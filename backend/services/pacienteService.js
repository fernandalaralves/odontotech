const pacienteRepository = require("../repositories/pacienteRepository");

async function listarPacientes() {
  return await pacienteRepository.findAll();
}
async function criarPaciente(paciente) {
  return await pacienteRepository.create(paciente);
}

module.exports = {
  listarPacientes,
  criarPaciente,
};
