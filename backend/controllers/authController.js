const authService = require("../services/authService");

class AuthController {
  async login(req, res) {
    try {
      const { username, senha } = req.body;

      if (!username || !senha) {
        return res.status(400).json({
          success: false,
          message: "Usuário e senha são obrigatórios",
        });
      }

      const usuario = await authService.login(username, senha);

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        usuario: usuario,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cadastro(req, res) {
    try {
      const { nome, username, senha, tipo, email } = req.body;

      const usuario = await authService.cadastro({
        nome,
        username,
        senha,
        tipo,
        email,
      });

      res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso",
        usuario: usuario,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async logout(req, res) {
    res.json({
      success: true,
      message: "Logout realizado com sucesso",
    });
  }
}

module.exports = new AuthController();
