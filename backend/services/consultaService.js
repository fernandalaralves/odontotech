import usuarioRepository from "../repositories/usuarioRepository.js";
class ConsultaService {
  async agendarConsulta(consulta) {
    // Lógica para agendar uma consulta
    return await usuarioRepository.create(consulta);
  }
  async listarConsultas() {
    // Lógica para listar consultas
    return await usuarioRepository.findAll();
  }
}

export default new ConsultaService();

//SERASSE????
