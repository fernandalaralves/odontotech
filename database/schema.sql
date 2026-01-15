-- ============================================
-- database/schema.sql
-- Script de criação do banco de dados
-- ============================================

-- Criar banco de dados
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
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE,
  INDEX idx_nome (nome),
  INDEX idx_cpf (cpf),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE,
  INDEX idx_nome (nome),
  INDEX idx_cro (cro),
  INDEX idx_especialidade (especialidade),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: usuarios
-- ============================================
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'dentista', 'recepcionista') NOT NULL,
  dentista_id INT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultimo_acesso TIMESTAMP NULL,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE SET NULL,
  INDEX idx_username (username),
  INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: consultas
-- ============================================
CREATE TABLE consultas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  dentista_id INT NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  status ENUM('agendada', 'confirmada', 'realizada', 'cancelada') NOT NULL DEFAULT 'agendada',
  observacoes TEXT,
  motivo_cancelamento TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE CASCADE,
  INDEX idx_paciente (paciente_id),
  INDEX idx_dentista (dentista_id),
  INDEX idx_data (data_consulta),
  INDEX idx_status (status),
  INDEX idx_data_hora (data_consulta, hora_consulta),
  CONSTRAINT uk_consulta UNIQUE (dentista_id, data_consulta, hora_consulta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: prontuarios
-- ============================================
CREATE TABLE prontuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consulta_id INT NOT NULL UNIQUE,
  paciente_id INT NOT NULL,
  dentista_id INT NOT NULL,
  anamnese TEXT,
  diagnostico TEXT NOT NULL,
  procedimentos TEXT NOT NULL,
  prescricoes TEXT,
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE CASCADE,
  INDEX idx_paciente (paciente_id),
  INDEX idx_dentista (dentista_id),
  INDEX idx_consulta (consulta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: pagamentos
-- ============================================
CREATE TABLE pagamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consulta_id INT NOT NULL UNIQUE,
  valor DECIMAL(10, 2) NOT NULL,
  forma_pagamento ENUM('dinheiro', 'cartao_debito', 'cartao_credito', 'pix', 'boleto') NOT NULL,
  status ENUM('pendente', 'pago', 'cancelado', 'estornado') NOT NULL DEFAULT 'pendente',
  data_pagamento DATE,
  data_vencimento DATE,
  desconto DECIMAL(10, 2) DEFAULT 0.00,
  acrescimo DECIMAL(10, 2) DEFAULT 0.00,
  valor_total DECIMAL(10, 2) GENERATED ALWAYS AS (valor - desconto + acrescimo) STORED,
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE,
  INDEX idx_consulta (consulta_id),
  INDEX idx_status (status),
  INDEX idx_data_pagamento (data_pagamento),
  INDEX idx_data_vencimento (data_vencimento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: procedimentos
-- ============================================
CREATE TABLE procedimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  valor_base DECIMAL(10, 2) NOT NULL,
  duracao_estimada INT COMMENT 'Duração em minutos',
  ativo BOOLEAN DEFAULT TRUE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_nome (nome),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: consulta_procedimentos (Relacionamento N:N)
-- ============================================
CREATE TABLE consulta_procedimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consulta_id INT NOT NULL,
  procedimento_id INT NOT NULL,
  quantidade INT DEFAULT 1,
  valor_unitario DECIMAL(10, 2) NOT NULL,
  observacoes TEXT,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE,
  FOREIGN KEY (procedimento_id) REFERENCES procedimentos(id) ON DELETE CASCADE,
  INDEX idx_consulta (consulta_id),
  INDEX idx_procedimento (procedimento_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabela: agendas (Disponibilidade dos dentistas)
-- ============================================
CREATE TABLE agendas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dentista_id INT NOT NULL,
  dia_semana TINYINT NOT NULL COMMENT '0=Domingo, 1=Segunda, ..., 6=Sábado',
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE CASCADE,
  INDEX idx_dentista (dentista_id),
  INDEX idx_dia_semana (dia_semana)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Inserir dados iniciais
-- ============================================

-- Inserir procedimentos padrão
INSERT INTO procedimentos (nome, descricao, valor_base, duracao_estimada) VALUES
('Consulta de Rotina', 'Avaliação geral e limpeza básica', 150.00, 30),
('Limpeza Dental', 'Profilaxia e remoção de tártaro', 200.00, 45),
('Restauração', 'Restauração de cárie com resina', 250.00, 60),
('Extração Simples', 'Extração de dente sem complicações', 300.00, 30),
('Canal (Endodontia)', 'Tratamento de canal radicular', 800.00, 90),
('Clareamento Dental', 'Clareamento a laser ou caseiro', 600.00, 60),
('Aplicação de Flúor', 'Aplicação tópica de flúor', 80.00, 15),
('Raio-X Panorâmico', 'Radiografia panorâmica', 120.00, 10),
('Prótese Parcial', 'Confecção de prótese parcial removível', 1500.00, 120),
('Implante Dentário', 'Colocação de implante osteointegrado', 3000.00, 120);

-- Inserir dentistas de exemplo
INSERT INTO dentistas (nome, cro, especialidade, telefone, email) VALUES
('Dr. Carlos Oliveira', 'CRO-CE 12345', 'Ortodontia', '(85) 99999-1001', 'carlos@clinica.com'),
('Dra. Ana Paula Costa', 'CRO-CE 67890', 'Endodontia', '(85) 99999-1002', 'ana@clinica.com'),
('Dr. Roberto Silva', 'CRO-CE 11223', 'Implantodontia', '(85) 99999-1003', 'roberto@clinica.com');

-- Inserir pacientes de exemplo
INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, endereco) VALUES
('Maria Silva Santos', '123.456.789-00', '1985-03-15', '(85) 99999-0001', 'maria@email.com', 'Rua das Flores, 123, Boa Viagem'),
('João Pedro Oliveira', '987.654.321-00', '1990-07-22', '(85) 99999-0002', 'joao@email.com', 'Av. Beira Mar, 456, Meireles'),
('Ana Carolina Lima', '456.789.123-00', '1982-11-30', '(85) 99999-0003', 'anacarol@email.com', 'Rua Central, 789, Centro');

-- Inserir usuários (senhas: admin123, dentista123, recep123)
-- Nota: Em produção, use bcrypt para hash das senhas
INSERT INTO usuarios (username, senha, tipo, dentista_id) VALUES
('admin', '$2b$10$K9YxqSRgPg.FzMLXF.C4wOv2YmWHqLlYVKTvgmOl0JE5k4k6Fy.Ry', 'admin', NULL),
('dentista1', '$2b$10$K9YxqSRgPg.FzMLXF.C4wOv2YmWHqLlYVKTvgmOl0JE5k4k6Fy.Ry', 'dentista', 1),
('recepcionista', '$2b$10$K9YxqSRgPg.FzMLXF.C4wOv2YmWHqLlYVKTvgmOl0JE5k4k6Fy.Ry', 'recepcionista', NULL);

-- Inserir consultas de exemplo
INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes) VALUES
(1, 1, '2026-01-15', '09:00:00', 'agendada', 'Primeira consulta - avaliação geral'),
(2, 2, '2026-01-15', '14:00:00', 'confirmada', 'Retorno para avaliação de canal'),
(3, 1, '2026-01-16', '10:00:00', 'agendada', 'Manutenção de aparelho ortodôntico');

-- Inserir agenda padrão para dentistas (Segunda a Sexta, 8h às 18h)
INSERT INTO agendas (dentista_id, dia_semana, hora_inicio, hora_fim) VALUES
-- Dr. Carlos (Dentista 1)
(1, 1, '08:00:00', '12:00:00'), -- Segunda manhã
(1, 1, '14:00:00', '18:00:00'), -- Segunda tarde
(1, 2, '08:00:00', '12:00:00'), -- Terça manhã
(1, 2, '14:00:00', '18:00:00'), -- Terça tarde
(1, 3, '08:00:00', '12:00:00'), -- Quarta manhã
(1, 3, '14:00:00', '18:00:00'), -- Quarta tarde
(1, 4, '08:00:00', '12:00:00'), -- Quinta manhã
(1, 4, '14:00:00', '18:00:00'), -- Quinta tarde
(1, 5, '08:00:00', '12:00:00'), -- Sexta manhã
(1, 5, '14:00:00', '18:00:00'), -- Sexta tarde

-- Dra. Ana (Dentista 2)
(2, 1, '09:00:00', '13:00:00'),
(2, 1, '14:00:00', '18:00:00'),
(2, 3, '09:00:00', '13:00:00'),
(2, 3, '14:00:00', '18:00:00'),
(2, 5, '09:00:00', '13:00:00'),
(2, 5, '14:00:00', '18:00:00');

-- ============================================
-- Views úteis
-- ============================================

-- View: Consultas com nomes de pacientes e dentistas
CREATE VIEW vw_consultas_completas AS
SELECT 
  c.id,
  c.paciente_id,
  p.nome AS paciente_nome,
  p.telefone AS paciente_telefone,
  c.dentista_id,
  d.nome AS dentista_nome,
  d.especialidade,
  c.data_consulta,
  c.hora_consulta,
  c.status,
  c.observacoes,
  c.data_criacao
FROM consultas c
INNER JOIN pacientes p ON c.paciente_id = p.id
INNER JOIN dentistas d ON c.dentista_id = d.id;

-- View: Resumo financeiro
CREATE VIEW vw_resumo_financeiro AS
SELECT 
  DATE_FORMAT(c.data_consulta, '%Y-%m') AS mes_ano,
  COUNT(p.id) AS total_consultas,
  SUM(CASE WHEN p.status = 'pago' THEN p.valor_total ELSE 0 END) AS total_recebido,
  SUM(CASE WHEN p.status = 'pendente' THEN p.valor_total ELSE 0 END) AS total_pendente,
  SUM(p.valor_total) AS total_geral
FROM consultas c
LEFT JOIN pagamentos p ON c.id = p.consulta_id
WHERE c.status IN ('realizada', 'confirmada')
GROUP BY DATE_FORMAT(c.data_consulta, '%Y-%m')
ORDER BY mes_ano DESC;

-- View: Prontuários completos
CREATE VIEW vw_prontuarios_completos AS
SELECT 
  pr.id,
  pr.consulta_id,
  c.data_consulta,
  c.hora_consulta,
  p.nome AS paciente_nome,
  p.cpf AS paciente_cpf,
  d.nome AS dentista_nome,
  d.cro AS dentista_cro,
  pr.anamnese,
  pr.diagnostico,
  pr.procedimentos,
  pr.prescricoes,
  pr.observacoes,
  pr.data_criacao
FROM prontuarios pr
INNER JOIN consultas c ON pr.consulta_id = c.id
INNER JOIN pacientes p ON pr.paciente_id = p.id
INNER JOIN dentistas d ON pr.dentista_id = d.id;

-- ============================================
-- Stored Procedures
-- ============================================

DELIMITER //

-- Procedure: Agendar consulta com validações
CREATE PROCEDURE sp_agendar_consulta(
  IN p_paciente_id INT,
  IN p_dentista_id INT,
  IN p_data_consulta DATE,
  IN p_hora_consulta TIME,
  IN p_observacoes TEXT
)
BEGIN
  DECLARE v_count INT;
  
  -- Verificar se o horário está disponível
  SELECT COUNT(*) INTO v_count
  FROM consultas
  WHERE dentista_id = p_dentista_id
    AND data_consulta = p_data_consulta
    AND hora_consulta = p_hora_consulta
    AND status IN ('agendada', 'confirmada');
  
  IF v_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Horário já ocupado para este dentista';
  END IF;
  
  -- Inserir consulta
  INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, observacoes)
  VALUES (p_paciente_id, p_dentista_id, p_data_consulta, p_hora_consulta, p_observacoes);
  
  SELECT LAST_INSERT_ID() AS consulta_id;
END //

-- Procedure: Relatório de consultas por período
CREATE PROCEDURE sp_relatorio_consultas(
  IN p_data_inicio DATE,
  IN p_data_fim DATE
)
BEGIN
  SELECT 
    d.nome AS dentista,
    COUNT(*) AS total_consultas,
    SUM(CASE WHEN c.status = 'realizada' THEN 1 ELSE 0 END) AS realizadas,
    SUM(CASE WHEN c.status = 'cancelada' THEN 1 ELSE 0 END) AS canceladas
  FROM consultas c
  INNER JOIN dentistas d ON c.dentista_id = d.id
  WHERE c.data_consulta BETWEEN p_data_inicio AND p_data_fim
  GROUP BY d.id, d.nome
  ORDER BY total_consultas DESC;
END //

DELIMITER ;

-- ============================================
-- Triggers
-- ============================================

DELIMITER //

-- Trigger: Validar CPF único ao inserir paciente
CREATE TRIGGER trg_validar_cpf_paciente
BEFORE INSERT ON pacientes
FOR EACH ROW
BEGIN
  DECLARE v_count INT;
  
  SELECT COUNT(*) INTO v_count
  FROM pacientes
  WHERE cpf = NEW.cpf AND id != NEW.id;
  
  IF v_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'CPF já cadastrado';
  END IF;
END //

-- Trigger: Criar pagamento automático ao realizar consulta
CREATE TRIGGER trg_criar_pagamento
AFTER UPDATE ON consultas
FOR EACH ROW
BEGIN
  IF NEW.status = 'realizada' AND OLD.status != 'realizada' THEN
    IF NOT EXISTS (SELECT 1 FROM pagamentos WHERE consulta_id = NEW.id) THEN
      INSERT INTO pagamentos (consulta_id, valor, forma_pagamento, status)
      VALUES (NEW.id, 150.00, 'dinheiro', 'pendente');
    END IF;
  END IF;
END //

DELIMITER ;

-- ============================================
-- Índices adicionais para performance
-- ============================================

CREATE INDEX idx_consultas_data_status ON consultas(data_consulta, status);
CREATE INDEX idx_pagamentos_status_valor ON pagamentos(status, valor_total);
CREATE INDEX idx_prontuarios_paciente_data ON prontuarios(paciente_id, data_criacao);

-- ============================================
-- Fim do script
-- ============================================