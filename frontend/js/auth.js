// ============================================
// SCRIPT DE AUTENTICAÇÃO
// ============================================

// Verificar se o usuário está logado
function verificarAutenticacao() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    // Redireciona para o login (raiz do sistema)
    window.location.href = "/index.html";
    return null;
  }

  return JSON.parse(usuario);
}

// Fazer logout
function logout() {
  if (confirm("Deseja realmente sair?")) {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html";
  }
}

// Obter dados do usuário logado
function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const usuario = verificarAutenticacao();

  if (usuario) {
    const nomeUsuarioElement = document.getElementById("nomeUsuario");
    if (nomeUsuarioElement) {
      nomeUsuarioElement.textContent = usuario.nome;
    }
  }
});
