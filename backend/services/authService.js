// Simulação de "banco de dados" em memória
const usuarios = [];

// ==========================
// LOGIN
// ==========================
export function login(email, senha) {
  return usuarios.find((u) => u.email === email && u.senha === senha) || null;
}

// ==========================
// CADASTRO
// ==========================
export function cadastrar({ nome, username, senha, tipo, email }) {
  // verifica se usuário já existe
  const existe = usuarios.find(
    (u) => u.username === username || u.email === email,
  );

  if (existe) {
    throw new Error("Usuário já cadastrado");
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    username,
    senha,
    tipo,
    email,
  };

  usuarios.push(novoUsuario);

  return novoUsuario;
}
