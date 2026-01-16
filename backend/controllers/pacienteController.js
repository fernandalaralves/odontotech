const pacienteService = require("../services/pacienteService");

class PacienteController {
  async listar(req, res) {
    try {
      const pacientes = await pacienteService.listarTodos();
      res.json({ success: true, data: pacientes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async buscar(req, res) {
    try {
      const paciente = await pacienteService.buscarPorId(req.params.id);
      res.json({ success: true, data: paciente });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async criar(req, res) {
    try {
      const paciente = await pacienteService.criar(req.body);
      res.status(201).json({ success: true, data: paciente });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const paciente = await pacienteService.atualizar(req.params.id, req.body);
      res.json({ success: true, data: paciente });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async excluir(req, res) {
    try {
      await pacienteService.excluir(req.params.id);
      res.json({ success: true, message: "Paciente excluído" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PacienteController();
