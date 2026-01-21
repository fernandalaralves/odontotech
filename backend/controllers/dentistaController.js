const dentistaService = require("../services/dentistaService");

async function listarDentistas(req, res) {
  const dentistas = await dentistaService.listarDentistas();
  res.json(dentistas);
}

async function criarDentista(req, res) {
  const dentista = await dentistaService.criarDentista(req.body);
  res.status(201).json(dentista);
}

module.exports = {
  listarDentistas,
  criarDentista,
};
