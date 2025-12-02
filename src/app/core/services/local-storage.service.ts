import { Injectable } from '@angular/core';

export interface UsuarioLocalStorage {
  id: string;
  usuario: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly KEY_USUARIO = 'USUARIO_LOGADO';

  // grava SEM array, só 1 usuário
  armazenarUsuario(usuario: UsuarioLocalStorage): void {
    localStorage.setItem(this.KEY_USUARIO, JSON.stringify(usuario));
  }

  // lê o usuário logado
  getUsuarioLogado(): UsuarioLocalStorage | null {
    const dados = localStorage.getItem(this.KEY_USUARIO);
    return dados ? JSON.parse(dados) : null;
  }

  // limpa o usuário logado
  excluirUsuariosAll(): void {
    localStorage.removeItem(this.KEY_USUARIO);
  }
}
