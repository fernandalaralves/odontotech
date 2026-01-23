import usuarioRepository from "../repositories/usuarioRepository.js";

class AuthService {
  async login(username, senha) {
    const usuario = await usuarioRepository.findByUsername(username);

    if (!usuario) throw new Error("Usuário não encontrado");
    if (usuario.senha !== senha) throw new Error("Senha incorreta");

    return {
      id: usuario.id,
      username: usuario.username,
      nome: usuario.nome,
      tipo: usuario.tipo,
      email: usuario.email,
    };
  }

  async cadastro(dados) {
    if (!dados.nome || !dados.username || !dados.senha) {
      throw new Error("Campos obrigatórios não preenchidos");
    }

    const existente = await usuarioRepository.findByUsername(dados.username);
    if (existente) throw new Error("Usuário já existe");

    const novo = await usuarioRepository.create(dados);

    return {
      id: novo.id,
      username: novo.username,
      nome: novo.nome,
      tipo: novo.tipo,
      email: novo.email,
    };
  }
}

export default new AuthService();

//PADRAO DE TODOS OS SERVICES
