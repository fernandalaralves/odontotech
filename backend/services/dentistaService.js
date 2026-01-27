import dentistaRepository from "../repositories/dentistaRepository.js";

class DentistaService {
  async listarDentistas() {
    return await dentistaRepository.findAll();
  }

  async criarDentista(dentista) {
    if (
      !dentista.nome ||
      !dentista.cro ||
      !dentista.especialidade ||
      !dentista.telefone ||
      !dentista.email
    ) {
      throw new Error("Todos os campos do dentista são obrigatórios");
    }

    return await dentistaRepository.create(dentista);
  }
}

export default new DentistaService();
