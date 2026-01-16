const pacienteRepository = require("../repositories/pacienteRepository");

class PacienteService {
  async listarTodos() {
    return await pacienteRepository.findAll();
  }

  async buscarPorId(id) {
    const paciente = await pacienteRepository.findById(id);
    if (!paciente) throw new Error("Paciente não encontrado");
    return paciente;
  }

  async criar(dados) {
    if (!dados.nome || !dados.cpf) {
      throw new Error("Nome e CPF são obrigatórios");
    }
    return await pacienteRepository.create(dados);
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);
    return await pacienteRepository.update(id, dados);
  }

  async excluir(id) {
    await this.buscarPorId(id);
    await pacienteRepository.delete(id);
  }
}

module.exports = new PacienteService();
