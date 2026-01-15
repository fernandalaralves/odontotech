// ============================================
// frontend/components/navbar.js
// ============================================

const Navbar = {
  render() {
    const usuario = AuthService.obterUsuario();
    const nomeUsuario = usuario ? usuario.username : "Usuário";

    return `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="dashboard.html">DentalCare</a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                  ${nomeUsuario}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#" onclick="AuthService.logout()">Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  },
};
