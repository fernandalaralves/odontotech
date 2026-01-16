const db = require("../config/database");

class PacienteRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM pacientes ORDER BY nome");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM pacientes WHERE id = ?", [id]);
    return rows[0];
  }

  async create(paciente) {
    const [result] = await db.query(
      "INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, endereco) VALUES (?, ?, ?, ?, ?, ?)",
      [
        paciente.nome,
        paciente.cpf,
        paciente.data_nascimento,
        paciente.telefone,
        paciente.email,
        paciente.endereco,
      ]
    );
    return this.findById(result.insertId);
  }

  async update(id, paciente) {
    await db.query(
      "UPDATE pacientes SET nome = ?, cpf = ?, data_nascimento = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?",
      [
        paciente.nome,
        paciente.cpf,
        paciente.data_nascimento,
        paciente.telefone,
        paciente.email,
        paciente.endereco,
        id,
      ]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM pacientes WHERE id = ?", [id]);
  }
}

module.exports = new PacienteRepository();
