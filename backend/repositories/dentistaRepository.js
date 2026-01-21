const bd = require("../db");

class DentistaRepository {
  async findById(id) {
    const [rows] = await bd.query("SELECT * FROM dentistas WHERE id = ?", [id]);
    return rows[0];
  }
  async create(dentista) {
    const [result] = await bd.query(
      "INSERT INTO dentistas (nome, cro, especialidade, telefone, email) VALUES (?, ?, ?, ?, ?)",
      [
        dentista.nome,
        dentista.cro,
        dentista.especialidade,
        dentista.telefone,
        dentista.email,
      ],
    );
    return this.findById(result.insertId);
  }
  async findAll() {
    const [rows] = await bd.query(
      "SELECT id, nome, cro, especialidade, telefone, email, data_criacao FROM dentistas",
    );
    return rows;
  }
}

module.exports = new DentistaRepository();
