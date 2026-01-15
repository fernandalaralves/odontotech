// ============================================
// backend/controllers/pacienteController.js
// ============================================

const pacienteService = require("../services/pacienteService");

class PacienteController {
  async listarTodos(req, res, next) {
    try {
      const pacientes = await pacienteService.listarTodos();
      res.json({
        success: true,
        data: pacientes,
      });
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const paciente = await pacienteService.buscarPorId(req.params.id);
      res.json({
        success: true,
        data: paciente,
      });
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const novoPaciente = await pacienteService.criar(req.body);
      res.status(201).json({
        success: true,
        message: "Paciente cadastrado com sucesso",
        data: novoPaciente,
      });
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const pacienteAtualizado = await pacienteService.atualizar(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        message: "Paciente atualizado com sucesso",
        data: pacienteAtualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  async excluir(req, res, next) {
    try {
      await pacienteService.excluir(req.params.id);
      res.json({
        success: true,
        message: "Paciente excluído com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async buscar(req, res, next) {
    try {
      const termo = req.query.q;
      const pacientes = await pacienteService.buscar(termo);
      res.json({
        success: true,
        data: pacientes,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PacienteController();
