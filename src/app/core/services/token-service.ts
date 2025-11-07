import { inject, Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  private cookieService = inject(CookieService);

 
  /** Recupera o token */
  getToken(): string | null {
    //return localStorage.getItem(this.TOKEN_KEY);
    return this.cookieService.get('USER_INFO')
  }

  /** Remove o token */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /** Verifica se há um token e se ainda é válido */
  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Opcional: validar expiração do JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true; // se não tiver exp, considera válido
      const now = Math.floor(Date.now() / 1000);
      return exp > now; // true se ainda não expirou
    } catch (err) {
      console.error('Token inválido:', err);
      return false;
    }
  }
}
