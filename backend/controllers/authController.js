import { login, cadastrar } from "../services/authService.js";

// LOGIN
export function autenticar(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    const usuario = login(email, senha);

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    return res.json({
      success: true,
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
}

// CADASTRO
export function cadastro(req, res) {
  try {
    const { nome, username, senha, tipo, email } = req.body;

    if (!nome || !username || !senha || !tipo) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos obrigatórios",
      });
    }

    cadastrar({ nome, username, senha, tipo, email });

    return res.status(201).json({
      success: true,
      message: "Cadastro realizado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
}
