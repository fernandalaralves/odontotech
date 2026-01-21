const db = require("../config/database");
class PacienteRepository {
  async findById(id) {
    const [rows] = await db.query("SELECT * FROM pacientes WHERE id = ?", [id]);
    return rows[0];
  }
  async create(paciente) {
    const [result] = await db.query(
      "INSERT INTO pacientes (nome, data_nascimento, telefone, email) VALUES (?, ?, ?, ?)",
      [
        paciente.nome,
        paciente.data_nascimento,
        paciente.telefone,
        paciente.email,
      ],
    );
    return this.findById(result.insertId);
  }
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, nome, data_nascimento, telefone, email, data_criacao FROM pacientes",
    );
    return rows;
  }
}
module.exports = new PacienteRepository();
