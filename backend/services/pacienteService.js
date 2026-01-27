import pacienteRepository from "../repositories/pacienteRepository.js";

class PacienteService {
  async listarPacientes() {
    return await pacienteRepository.findAll();
  }

  async criarPaciente(paciente) {
    if (
      !paciente.nome ||
      !paciente.cpf ||
      !paciente.data_nascimento ||
      !paciente.telefone
    ) {
      throw new Error("Campos obrigatórios do paciente não preenchidos");
    }

    return await pacienteRepository.create(paciente);
  }
}

export default new PacienteService();
