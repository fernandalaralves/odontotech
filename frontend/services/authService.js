// ============================================
// frontend/services/authService.js - Autenticação
// ============================================

class AuthenticationService {
  async login(username, senha) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      return data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
  }

  verificarAutenticacao() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  obterUsuario() {
    const usuarioStr = localStorage.getItem("usuario");
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  obterToken() {
    return localStorage.getItem("token");
  }
}

const AuthService = new AuthenticationService();
