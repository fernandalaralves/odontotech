// ============================================
// frontend/services/storageService.js
// ============================================

class StorageService {
  salvar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
      return false;
    }
  }

  obter(chave) {
    try {
      const item = localStorage.getItem(chave);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Erro ao obter do localStorage:", error);
      return null;
    }
  }

  remover(chave) {
    try {
      localStorage.removeItem(chave);
      return true;
    } catch (error) {
      console.error("Erro ao remover do localStorage:", error);
      return false;
    }
  }

  limpar() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Erro ao limpar localStorage:", error);
      return false;
    }
  }
}

const Storage = new StorageService();
