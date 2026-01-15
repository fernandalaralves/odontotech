// ============================================
// backend/models/Paciente.js - Modelo de Paciente
// ============================================

class Paciente {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.data_nascimento = data.data_nascimento;
    this.telefone = data.telefone;
    this.email = data.email;
    this.endereco = data.endereco;
    this.data_cadastro = data.data_cadastro;
    this.ativo = data.ativo !== undefined ? data.ativo : true;
  }

  static validar(data) {
    const erros = [];

    if (!data.nome || data.nome.trim().length < 3) {
      erros.push("Nome deve ter pelo menos 3 caracteres");
    }

    if (!data.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf)) {
      erros.push("CPF inválido. Formato: 000.000.000-00");
    }

    if (!data.data_nascimento) {
      erros.push("Data de nascimento é obrigatória");
    }

    if (!data.telefone || !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(data.telefone)) {
      erros.push("Telefone inválido. Formato: (00) 00000-0000");
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      erros.push("Email inválido");
    }

    return {
      valido: erros.length === 0,
      erros,
    };
  }
}

module.exports = Paciente;
