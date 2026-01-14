// ============================================
// frontend/components/sidebar.js
// ============================================

const Sidebar = {
  render(paginaAtiva) {
    const menuItems = [
      {
        id: "dashboard",
        nome: "Dashboard",
        icone: "📊",
        link: "dashboard.html",
      },
      {
        id: "pacientes",
        nome: "Pacientes",
        icone: "👥",
        link: "pacientes.html",
      },
      {
        id: "dentistas",
        nome: "Dentistas",
        icone: "👨‍⚕️",
        link: "dentistas.html",
      },
      {
        id: "consultas",
        nome: "Consultas",
        icone: "📅",
        link: "consultas.html",
      },
      {
        id: "prontuarios",
        nome: "Prontuários",
        icone: "📋",
        link: "prontuarios.html",
      },
      {
        id: "pagamentos",
        nome: "Pagamentos",
        icone: "💰",
        link: "pagamentos.html",
      },
    ];

    const menuHTML = menuItems
      .map((item) => {
        const ativo = item.id === paginaAtiva ? "active bg-secondary" : "";
        return `
        <li class="nav-item">
          <a class="nav-link text-white ${ativo}" href="${item.link}">
            <span class="me-2">${item.icone}</span> ${item.nome}
          </a>
        </li>
      `;
      })
      .join("");

    return `
      <div class="p-3">
        <h5 class="text-white mb-3">Menu</h5>
        <ul class="nav flex-column">
          ${menuHTML}
        </ul>
      </div>
    `;
  },
};
