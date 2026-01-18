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
      email: usuario.email,
    };
  }

  async cadastro(dados) {
    // Validações
    if (!dados.nome || !dados.username || !dados.senha) {
      throw new Error("Nome, usuário e senha são obrigatórios");
    }

    if (dados.nome.length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres");
    }

    if (dados.username.length < 3) {
      throw new Error("O usuário deve ter pelo menos 3 caracteres");
    }

    if (!/^[a-zA-Z0-9]+$/.test(dados.username)) {
      throw new Error("O usuário deve conter apenas letras e números");
    }

    if (dados.senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    // Validar email se fornecido
    if (dados.email && !this.validarEmail(dados.email)) {
      throw new Error("Email inválido");
    }

    // Verificar se usuário já existe
    const usuarioExistente = await usuarioRepository.findByUsername(
      dados.username,
    );
    if (usuarioExistente) {
      throw new Error("Nome de usuário já está em uso");
    }

    // Criar usuário
    const novoUsuario = await usuarioRepository.create({
      username: dados.username,
      senha: dados.senha, // Em produção: bcrypt.hashSync(dados.senha, 10)
      nome: dados.nome,
      tipo: dados.tipo || "recepcionista",
      email: dados.email || null,
    });

    return {
      id: novoUsuario.id,
      username: novoUsuario.username,
      nome: novoUsuario.nome,
      tipo: novoUsuario.tipo,
      email: novoUsuario.email,
    };
  }

  validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

module.exports = new AuthService();
