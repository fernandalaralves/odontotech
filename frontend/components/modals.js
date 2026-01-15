// ============================================
// frontend/components/modals.js
// ============================================

const Modals = {
  confirmar(titulo, mensagem, callback) {
    const modalHTML = `
      <div class="modal fade" id="modalConfirmar" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${titulo}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>${mensagem}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="btnConfirmar">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(
      document.getElementById("modalConfirmar")
    );

    document.getElementById("btnConfirmar").onclick = function () {
      callback();
      modal.hide();
      document.getElementById("modalConfirmar").remove();
    };

    modal.show();
  },

  alerta(titulo, mensagem, tipo = "info") {
    const tipoClasse = {
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning",
      info: "bg-info",
    };

    const modalHTML = `
      <div class="modal fade" id="modalAlerta" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header ${tipoClasse[tipo]} text-white">
              <h5 class="modal-title">${titulo}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>${mensagem}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("modalAlerta"));

    modal.show();

    document
      .getElementById("modalAlerta")
      .addEventListener("hidden.bs.modal", function () {
        this.remove();
      });
  },
};
