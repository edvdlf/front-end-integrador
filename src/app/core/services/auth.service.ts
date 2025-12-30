import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AlterarSenhaRequest,
  AuthRequest,
  AuthResponse,
  MensagemResponse,
  RedefinirSenhaRequest,
} from '../../auth/models/auth.model';
import { Observable, tap } from 'rxjs';

export type PerfilUsuario = 'ADMIN' | 'NORMAL';

export interface UsuarioLogado {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
  roles: PerfilUsuario[]; // simples e consistente
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _usuario = signal<UsuarioLogado | null>(null);

  readonly usuario = computed(() => this._usuario());
  readonly perfil  = computed<PerfilUsuario>(() => this._usuario()?.perfil ?? 'NORMAL');
  readonly roles   = computed<PerfilUsuario[]>(() => this._usuario()?.roles ?? []);

  private API_URL = environment.api.baseUrlAuth;

  constructor(private http: HttpClient) {
    this.bootstrapFromStorage();
  }

  /** LOGIN */
  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
  return this.http
    .post<AuthResponse>(`${this.API_URL}/auth/signin`, requestDatas, { withCredentials: true })
    .pipe(
      //tap((resp) => {
       // const perfil = this.toPerfilUsuario(resp.role);

       // const user: UsuarioLogado = {
       //   id: resp.id,
       //   nome: resp.username,
       //   perfil,
       //   roles: [perfil],
      //  };

      //  this._usuario.set(user);
      //  localStorage.setItem('USER_INFO', JSON.stringify(user));
     // })
      tap((resp: any) => {
          if (resp?.accessToken) {
          localStorage.setItem('ACCESS_TOKEN', resp.accessToken);
      }
      const perfil = this.toPerfilUsuario(resp.role);
      // (seu código atual)
      const usuario: UsuarioLogado = {
        id: resp.id,
        nome: resp.username,
        perfil,
        roles: [perfil],
        
      };
      this._usuario.set(usuario);
      localStorage.setItem('USER_INFO', JSON.stringify(usuario));
    })

    );
}

private toPerfilUsuario(role: string): PerfilUsuario {
  return role === 'ADMIN' ? 'ADMIN' : 'NORMAL';
}

  login(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.authUser(requestDatas);
  }

  isLoggedIn(): boolean {
    return !!this._usuario();
  }

  logout(): void {
    this._usuario.set(null);
    localStorage.removeItem('USER_INFO');
  }

  // ==========================
  // Persistência
  // ==========================
  private persistUser(user: UsuarioLogado) {
    localStorage.setItem('USER_INFO', JSON.stringify(user));
  }

  private bootstrapFromStorage(): void {
    const raw = localStorage.getItem('USER_INFO');
    if (!raw) return;

    try {
      const user = JSON.parse(raw) as UsuarioLogado;
      if (user?.id && user?.perfil) {
        this._usuario.set(user);
      }
    } catch {
      /* ignore */
    }
  }

  // ==========================
  // Outros endpoints
  // ==========================
  recuperarSenha(email: string): Observable<MensagemResponse> {
    return this.http.post<MensagemResponse>(`${this.API_URL}/auth/recuperar-senha`, email, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  alterarSenha(requestDatas: AlterarSenhaRequest): Observable<AlterarSenhaRequest> {
    return this.http.put<AlterarSenhaRequest>(`${this.API_URL}/auth/alterar-senha`, requestDatas);
  }

  redefinirSenha(requestDatas: RedefinirSenhaRequest): Observable<RedefinirSenhaRequest> {
    return this.http.post<RedefinirSenhaRequest>(`${this.API_URL}/auth/redefinir-senha`, requestDatas);
  }
}
