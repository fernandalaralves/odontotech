const consultaRepository = require("../repositories/consultaRepository");

async function listarConsultas() {
  return await consultaRepository.findAll();
}
async function criarConsulta(consulta) {
  return await consultaRepository.create(consulta);
}

module.exports = {
  listarConsultas,
  criarConsulta,
};
