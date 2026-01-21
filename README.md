# Sistema de Gestão de Clínica Odontológica

## Descrição

Sistema web para gestão de clínicas odontológicas com arquitetura em camadas, permitindo gerenciar pacientes, dentistas, consultas, prontuários e pagamentos.

## Autores

- **Fernanda Lara**
- **Análise e Desenvolvimento de Sistemas**
- **Janeiro/2026**

---

## Arquitetura do Sistema

### Arquitetura em Camadas

```
┌─────────────────────────────┐
│   CAMADA DE APRESENTAÇÃO    │
│   (Frontend - HTML/CSS/JS)  │
└─────────────┬───────────────┘
              │ HTTP/JSON
┌─────────────▼───────────────┐
│   CAMADA DE APLICAÇÃO       │
│   (Backend - Node.js)       │
└─────────────┬───────────────┘
              │ SQL
┌─────────────▼───────────────┐
│   CAMADA DE PERSISTÊNCIA    │
│   (MySQL)                   │
└─────────────────────────────┘
```

### Justificativa

A arquitetura em camadas foi escolhida por:

1. **Separação de responsabilidades** - cada camada tem uma função específica
2. **Facilidade de manutenção** - mudanças em uma camada não afetam as outras
3. **Reusabilidade** - componentes podem ser reutilizados
4. **Testabilidade** - cada camada pode ser testada independentemente

---

## Tecnologias Utilizadas

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web
- **MySQL2** - Driver MySQL para Node.js
- **CORS** - Gerenciamento de requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend

- **HTML5** - Estruturação das páginas
- **CSS3** - Estilização
- **Bootstrap 5** - Framework CSS responsivo
- **JavaScript (ES6+)** - Interatividade

### Banco de Dados

- **MySQL** - Sistema de gerenciamento de banco de dados

---

## Modelagem do Sistema

### Entidades

#### 1. Paciente

- **Atributos:** id, nome, cpf, data_nascimento, telefone, email, endereco
- **Relacionamentos:** 1:N com Consulta

#### 2. Dentista

- **Atributos:** id, nome, cro, especialidade, telefone, email
- **Relacionamentos:** 1:N com Consulta

#### 3. Usuario

- **Atributos:** id, username, senha, nome, tipo
- **Relacionamentos:** Acesso ao sistema

#### 4. Consulta

- **Atributos:** id, paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes
- **Relacionamentos:** N:1 com Paciente, N:1 com Dentista

#### 5. Prontuario

- **Atributos:** id, consulta_id, paciente_id, diagnostico, tratamento, observacoes
- **Relacionamentos:** 1:1 com Consulta

#### 6. Pagamento

- **Atributos:** id, consulta_id, valor, forma_pagamento, status
- **Relacionamentos:** N:1 com Consulta

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/fernandalaralves/odontotech.git
cd odontotech
```

### Passo 2: Configurar o Banco de Dados

```bash
mysql -u root -p < database/schema.sql
```

### Passo 3: Configurar o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=clinica_odontologica
```

Iniciar o servidor:

```bash
npm start
```

### Passo 4: Abrir o Frontend

Abra o arquivo `frontend/pages/dashboard.html` no navegador ou use um servidor local:

```bash
cd frontend
npx http-server -p 8080
```

Acesse: `http://localhost:8080/pages/dashboard.html`

---

## Estrutura de Pastas

```
odontotech/
├── database/
│   └── schema.sql
├── backend/
│   ├── config/
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
|   |_js/
│   └── pages/
└── README.md
```

---

## Endpoints da API

### Pacientes

- `GET /api/pacientes` - Listar todos
- `GET /api/pacientes/:id` - Buscar por ID
- `POST /api/pacientes` - Criar novo
- `PUT /api/pacientes/:id` - Atualizar
- `DELETE /api/pacientes/:id` - Excluir

### Dentistas

- `GET /api/dentistas` - Listar todos
- `GET /api/dentistas/:id` - Buscar por ID
- `POST /api/dentistas` - Criar novo
- `PUT /api/dentistas/:id` - Atualizar
- `DELETE /api/dentistas/:id` - Excluir

### Consultas

- `GET /api/consultas` - Listar todas
- `GET /api/consultas/:id` - Buscar por ID
- `POST /api/consultas` - Criar nova
- `PUT /api/consultas/:id` - Atualizar
- `DELETE /api/consultas/:id` - Excluir

---

## Requisitos Funcionais

- **RF01:** Cadastrar, editar, visualizar e excluir pacientes
- **RF02:** Cadastrar, editar, visualizar e excluir dentistas
- **RF03:** Agendar, visualizar e cancelar consultas
- **RF04:** Registrar prontuários de consultas
- **RF05:** Gerenciar pagamentos
- **RF06:** Autenticação de usuários

## Requisitos Não Funcionais

- **RNF01:** Interface responsiva e intuitiva
- **RNF02:** Tempo de resposta inferior a 2 segundos
- **RNF03:** Código organizado e documentado
- **RNF04:** Segurança básica de dados

---

## Licença

Este projeto é de uso acadêmico.
