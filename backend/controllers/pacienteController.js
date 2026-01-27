import pacienteService from "../services/pacienteService.js";

export async function listarPacientes(req, res) {
  res.json(await pacienteService.listarPacientes());
}

export async function criarPaciente(req, res) {
  res.status(201).json(await pacienteService.criarPaciente(req.body));
}
