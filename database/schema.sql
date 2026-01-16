CREATE DATABASE IF NOT EXISTS clinica_odontologica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clinica_odontologica;

-- ============================================
-- Tabela: pacientes
-- ============================================
CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(100),
  endereco VARCHAR(200),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabela: dentistas
-- ============================================
CREATE TABLE dentistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cro VARCHAR(20) NOT NULL UNIQUE,
  especialidade VARCHAR(50) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabela: usuarios
-- ============================================
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  tipo ENUM('admin', 'dentista', 'recepcionista') NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabela: consultas
-- ============================================
CREATE TABLE consultas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  dentista_id INT NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  status ENUM('agendada', 'confirmada', 'realizada', 'cancelada') DEFAULT 'agendada',
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabela: prontuarios
-- ============================================
CREATE TABLE prontuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consulta_id INT NOT NULL,
  paciente_id INT NOT NULL,
  diagnostico TEXT NOT NULL,
  tratamento TEXT NOT NULL,
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabela: pagamentos
-- ============================================
CREATE TABLE pagamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consulta_id INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  forma_pagamento VARCHAR(50) NOT NULL,
  status ENUM('pendente', 'pago') DEFAULT 'pendente',
  data_pagamento DATE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- DADOS DE EXEMPLO
-- ============================================

-- Inserir dentistas
INSERT INTO dentistas (nome, cro, especialidade, telefone, email) VALUES
('Dr. Carlos Oliveira', 'CRO-CE 12345', 'Ortodontia', '(85) 99999-1001', 'carlos@clinica.com'),
('Dra. Ana Paula Costa', 'CRO-CE 67890', 'Endodontia', '(85) 99999-1002', 'ana@clinica.com');

-- Inserir pacientes
INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, endereco) VALUES
('Maria Silva Santos', '123.456.789-00', '1985-03-15', '(85) 99999-0001', 'maria@email.com', 'Rua das Flores, 123'),
('João Pedro Oliveira', '987.654.321-00', '1990-07-22', '(85) 99999-0002', 'joao@email.com', 'Av. Beira Mar, 456'),
('Ana Carolina Lima', '456.789.123-00', '1982-11-30', '(85) 99999-0003', 'ana@email.com', 'Rua Central, 789');

-- Inserir usuários (senha: admin123 para todos)
INSERT INTO usuarios (username, senha, nome, tipo) VALUES
('admin', 'admin123', 'Administrador', 'admin'),
('recepcionista', 'admin123', 'Maria Recepcionista', 'recepcionista'),
('dentista1', 'admin123', 'Dr. Carlos Oliveira', 'dentista');

-- Inserir consultas
INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes) VALUES
(1, 1, '2026-01-20', '09:00:00', 'agendada', 'Primeira consulta'),
(2, 2, '2026-01-20', '14:00:00', 'confirmada', 'Retorno'),
(3, 1, '2026-01-21', '10:00:00', 'agendada', 'Avaliação inicial');

-- Inserir pagamentos
INSERT INTO pagamentos (consulta_id, valor, forma_pagamento, status) VALUES
(1, 150.00, 'dinheiro', 'pendente'),
(2, 200.00, 'cartao', 'pago');