import { Injectable } from '@angular/core';
import { UsuarioLocalStorage } from '../models/localstorage.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  getUsuariosStorage(): UsuarioLocalStorage[] {
  	const usuariosStorage = localStorage['usuariosStorage'];
  	return usuariosStorage ? JSON.parse(usuariosStorage) : [];
  }
  getUsuarioStorageById(id: string): UsuarioLocalStorage | undefined  {
    const usuariosStorage: UsuarioLocalStorage[] = this.getUsuariosStorage();
    const result = usuariosStorage.find(u => u.id === id);
    return result;
  }

  getUsuarioStorageLast(): UsuarioLocalStorage | undefined  {
    const usuariosStorage: UsuarioLocalStorage[] = this.getUsuariosStorage();

    if (usuariosStorage.length > 0) {
      return usuariosStorage[usuariosStorage.length - 1];
    } else {
      return undefined; // Retorna undefined se a lista estiver vazia
    }
  }

  excluirUsuariosAll(): void {
    let temp = this.getUsuariosStorage();
    temp = temp.filter(t => t.id !== "");
  	localStorage['usuariosStorage'] = JSON.stringify(temp);
  }

  armazenarUsuario(usuarioStorage: UsuarioLocalStorage): void {
    this.excluirUsuariosAll();
  	const usuariosStorage = this.getUsuariosStorage();
    usuariosStorage.push(usuarioStorage)
  	localStorage['usuariosStorage'] = JSON.stringify(usuariosStorage);
  }


 


  
  
  
  
}
