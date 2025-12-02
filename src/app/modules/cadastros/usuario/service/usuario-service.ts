import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioRequest, UsuarioResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   private http = inject(HttpClient);

  // Ajuste a baseUrl conforme seu environment (ex.: baseUrlAuth, baseUrlPortal, etc.)
  
    private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.usuarios;
  

   
   listarTodos(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.baseUrl);
  }

  // ============================================================
  // BUSCAR POR ID
  // ============================================================
  buscarPorId(id: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
  }

  // ============================================================
  // CRIAR
  // ============================================================
  criar(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    // normalmente o id não é enviado na criação
    const payload: UsuarioRequest = { ...usuario };
    
    return this.http.post<UsuarioResponse>(this.baseUrl, payload);
  }

  // ============================================================
  // ATUALIZAR
  // ============================================================
  atualizar(id: string, usuario: UsuarioResponse): Observable<UsuarioResponse> {
    const payload: UsuarioResponse = { ...usuario, id };
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}`, payload);
  }

  // ============================================================
  // DELETAR
  // ============================================================
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ============================================================
  // COUNTS
  // ============================================================
  countTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countAtivos(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/ativos`);
  }
}
  
 
