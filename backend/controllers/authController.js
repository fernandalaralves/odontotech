import { login } from "../services/authService.js";

export function autenticar(req, res) {
  const { email, senha } = req.body;

  const usuario = login(email, senha);

  if (!usuario) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  res.json(usuario);
}
