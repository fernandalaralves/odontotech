function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarTelefone(telefone) {
  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR");
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function aplicarMascaraCPF(input) {
  input.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
  });
}

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = value;
  });
}

function mostrarLoading(mostrar = true) {
  let loading = document.getElementById("loading");

  if (!loading && mostrar) {
    loading = document.createElement("div");
    loading.id = "loading";
    loading.className =
      "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50";
    loading.style.zIndex = "9999";
    loading.innerHTML = `
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    `;
    document.body.appendChild(loading);
  } else if (loading && !mostrar) {
    loading.remove();
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const cpfInputs = document.querySelectorAll('[data-mask="cpf"]');
  cpfInputs.forEach((input) => aplicarMascaraCPF(input));

  const telInputs = document.querySelectorAll('[data-mask="telefone"]');
  telInputs.forEach((input) => aplicarMascaraTelefone(input));
});
