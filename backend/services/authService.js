// backend/services/authService.js

export function login(email, senha) {
  // login fake (sem banco)
  if (email === "admin@email.com" && senha === "123") {
    return {
      id: 1,
      nome: "Administrador",
      email,
    };
  }

  return null;
}
