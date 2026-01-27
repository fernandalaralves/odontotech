import db from "../config/database.js";

class ConsultaRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM consultas");
    return rows;
  }

  async create(consulta) {
    const [result] = await db.query(
      "INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes) VALUES (?, ?, ?, ?, ?, ?)",
      [
        consulta.paciente_id,
        consulta.dentista_id,
        consulta.data_consulta,
        consulta.hora_consulta,
        consulta.status,
        consulta.observacoes,
      ],
    );
    return { id: result.insertId, ...consulta };
  }
}

export default new ConsultaRepository();
