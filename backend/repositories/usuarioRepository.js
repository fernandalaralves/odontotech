const db = require("../config/database");

class UsuarioRepository {
  async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  async create(usuario) {
    const [result] = await db.query(
      "INSERT INTO usuarios (username, senha, nome, tipo) VALUES (?, ?, ?, ?)",
      [usuario.username, usuario.senha, usuario.nome, usuario.tipo]
    );
    return this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0];
  }

  async findAll() {
    const [rows] = await db.query(
      "SELECT id, username, nome, tipo, data_criacao FROM usuarios"
    );
    return rows;
  }
}

module.exports = new UsuarioRepository();
