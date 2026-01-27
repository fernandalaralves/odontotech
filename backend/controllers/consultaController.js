import consultaService from "../services/consultaService.js";

export async function listarConsultas(req, res) {
  res.json(await consultaService.listarConsultas());
}

export async function criarConsulta(req, res) {
  res.status(201).json(await consultaService.criarConsulta(req.body));
}
