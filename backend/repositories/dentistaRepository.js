import db from "../config/database.js";

class DentistaRepository {
  async findById(id) {
    const [rows] = await db.query("SELECT * FROM dentistas WHERE id = ?", [id]);
    return rows[0];
  }

  async create(dentista) {
    const [result] = await db.query(
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
    const [rows] = await db.query("SELECT * FROM dentistas");
    return rows;
  }
}

export default new DentistaRepository();

//PADRAO DE TODOS OS REPOSITORIES
