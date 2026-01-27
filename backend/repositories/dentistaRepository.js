import db from "../config/database.js";

class DentistaRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM dentistas");
    return rows;
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
    return { id: result.insertId, ...dentista };
  }
}

export default new DentistaRepository();
