//script para páginas protegidas
// Verificar se o usuário está logado
function verificarAutenticacao() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    // Redirecionar para login se não estiver autenticado
    window.location.href = "../index.html";
    return null;
  }

  return JSON.parse(usuario);
}

// Fazer logout
function logout() {
  if (confirm("Deseja realmente sair?")) {
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
  }
}

// Obter dados do usuário logado
function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

// Verificar ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  const usuario = verificarAutenticacao();

  if (usuario) {
    // Exibir nome do usuário se houver elemento
    const nomeUsuarioElement = document.getElementById("nomeUsuario");
    if (nomeUsuarioElement) {
      nomeUsuarioElement.textContent = usuario.nome;
    }
  }
});

// ============================================
// Como usar nas páginas protegidas:
// ============================================
// 1. Adicione antes do </body>:
//    <script src="../js/auth.js"></script>
//
// 2. No navbar, adicione:
//    <span id="nomeUsuario"></span>
//    <button onclick="logout()">Sair</button>
