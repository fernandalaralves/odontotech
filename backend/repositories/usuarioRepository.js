import db from "../config/database.js";

class UsuarioRepository {
  async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  async create(usuario) {
    const [result] = await db.query(
      "INSERT INTO usuarios (username, senha, nome, tipo, email) VALUES (?, ?, ?, ?, ?)",
      [
        usuario.username,
        usuario.senha,
        usuario.nome,
        usuario.tipo,
        usuario.email,
      ],
    );
    return { id: result.insertId, ...usuario };
  }
}

export default new UsuarioRepository();
