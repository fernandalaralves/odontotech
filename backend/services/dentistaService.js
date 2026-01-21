const dentistaRepository = require("../repositories/dentistaRepository");

async function listarDentistas() {
  return await dentistaRepository.findAll();
}
async function criarDentista(dentista) {
  return await dentistaRepository.create(dentista);
}

module.exports = {
  listarDentistas,
  criarDentista,
};
