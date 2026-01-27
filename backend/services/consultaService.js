import consultaRepository from "../repositories/consultaRepository.js";

class ConsultaService {
  async listarConsultas() {
    return await consultaRepository.findAll();
  }

  async criarConsulta(consulta) {
    // validações básicas
    if (
      !consulta.paciente_id ||
      !consulta.dentista_id ||
      !consulta.data_consulta ||
      !consulta.hora_consulta
    ) {
      throw new Error("Campos obrigatórios da consulta não preenchidos");
    }

    return await consultaRepository.create(consulta);
  }
}

export default new ConsultaService();
