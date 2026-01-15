// ============================================
// backend/services/pacienteService.js
// ============================================

const pacienteRepository = require("../repositories/pacienteRepository");
const Paciente = require("../models/Paciente");

class PacienteService {
  async listarTodos() {
    return await pacienteRepository.findAll();
  }

  async buscarPorId(id) {
    const paciente = await pacienteRepository.findById(id);
    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }
    return paciente;
  }

  async criar(dadosPaciente) {
    // Validar dados
    const validacao = Paciente.validar(dadosPaciente);
    if (!validacao.valido) {
      throw new Error(validacao.erros.join(", "));
    }

    // Verificar se CPF já existe
    const pacienteExistente = await pacienteRepository.findByCpf(
      dadosPaciente.cpf
    );
    if (pacienteExistente) {
      throw new Error("CPF já cadastrado no sistema");
    }

    return await pacienteRepository.create(dadosPaciente);
  }

  async atualizar(id, dadosPaciente) {
    // Verificar se paciente existe
    await this.buscarPorId(id);

    // Validar dados
    const validacao = Paciente.validar(dadosPaciente);
    if (!validacao.valido) {
      throw new Error(validacao.erros.join(", "));
    }

    // Verificar se CPF já existe em outro paciente
    const pacienteComCpf = await pacienteRepository.findByCpf(
      dadosPaciente.cpf
    );
    if (pacienteComCpf && pacienteComCpf.id !== parseInt(id)) {
      throw new Error("CPF já cadastrado para outro paciente");
    }

    return await pacienteRepository.update(id, dadosPaciente);
  }

  async excluir(id) {
    // Verificar se paciente existe
    await this.buscarPorId(id);

    // Aqui você pode adicionar validações adicionais
    // Por exemplo: verificar se há consultas futuras

    return await pacienteRepository.delete(id);
  }

  async buscar(termo) {
    if (!termo || termo.trim().length < 2) {
      throw new Error("Digite pelo menos 2 caracteres para buscar");
    }
    return await pacienteRepository.search(termo);
  }
}

module.exports = new PacienteService();
