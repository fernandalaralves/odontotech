import db from "../config/database.js";

class PacienteRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM pacientes");
    return rows;
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
      ],
    );
    return { id: result.insertId, ...paciente };
  }
}

export default new PacienteRepository();
