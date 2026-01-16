const usuarioRepository = require("../repositories/usuarioRepository");

class AuthService {
  async login(username, senha) {
    // Buscar usuário
    const usuario = await usuarioRepository.findByUsername(username);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar senha (em produção, use bcrypt)
    if (usuario.senha !== senha) {
      throw new Error("Senha incorreta");
    }

    // Retornar dados do usuário (sem a senha)
    return {
      id: usuario.id,
      username: usuario.username,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };
  }

  async cadastro(dados) {
    // Validações
    if (!dados.nome || !dados.username || !dados.senha) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (dados.senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    // Verificar se usuário já existe
    const usuarioExistente = await usuarioRepository.findByUsername(
      dados.username
    );
    if (usuarioExistente) {
      throw new Error("Nome de usuário já está em uso");
    }

    // Criar usuário (em produção, use bcrypt para hash da senha)
    const novoUsuario = await usuarioRepository.create({
      username: dados.username,
      senha: dados.senha, // Em produção: bcrypt.hashSync(dados.senha, 10)
      nome: dados.nome,
      tipo: dados.tipo || "recepcionista",
    });

    return {
      id: novoUsuario.id,
      username: novoUsuario.username,
      nome: novoUsuario.nome,
      tipo: novoUsuario.tipo,
    };
  }
}

module.exports = new AuthService();
