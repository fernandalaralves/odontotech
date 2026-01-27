import dentistaService from "../services/dentistaService.js";

export async function listarDentistas(req, res) {
  res.json(await dentistaService.listarDentistas());
}

export async function criarDentista(req, res) {
  res.status(201).json(await dentistaService.criarDentista(req.body));
}
