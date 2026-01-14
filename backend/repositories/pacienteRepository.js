// ============================================
// backend/repositories/pacienteRepository.js
// ============================================

const db = require("../config/database");
const Paciente = require("../models/Paciente");

class PacienteRepository {
  async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM pacientes WHERE ativo = true ORDER BY nome"
    );
    return rows.map((row) => new Paciente(row));
  }

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM pacientes WHERE id = ? AND ativo = true",
      [id]
    );
    return rows.length > 0 ? new Paciente(rows[0]) : null;
  }

  async findByCpf(cpf) {
    const [rows] = await db.query("SELECT * FROM pacientes WHERE cpf = ?", [
      cpf,
    ]);
    return rows.length > 0 ? new Paciente(rows[0]) : null;
  }

  async create(pacienteData) {
    const [result] = await db.query(
      `INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, endereco)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        pacienteData.nome,
        pacienteData.cpf,
        pacienteData.data_nascimento,
        pacienteData.telefone,
        pacienteData.email,
        pacienteData.endereco,
      ]
    );
    return this.findById(result.insertId);
  }

  async update(id, pacienteData) {
    await db.query(
      `UPDATE pacientes 
       SET nome = ?, cpf = ?, data_nascimento = ?, 
           telefone = ?, email = ?, endereco = ?
       WHERE id = ?`,
      [
        pacienteData.nome,
        pacienteData.cpf,
        pacienteData.data_nascimento,
        pacienteData.telefone,
        pacienteData.email,
        pacienteData.endereco,
        id,
      ]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query("UPDATE pacientes SET ativo = false WHERE id = ?", [id]);
    return true;
  }

  async search(termo) {
    const [rows] = await db.query(
      `SELECT * FROM pacientes 
       WHERE ativo = true AND (
         nome LIKE ? OR 
         cpf LIKE ? OR 
         telefone LIKE ?
       )
       ORDER BY nome`,
      [`%${termo}%`, `%${termo}%`, `%${termo}%`]
    );
    return rows.map((row) => new Paciente(row));
  }
}

module.exports = new PacienteRepository();
