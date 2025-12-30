import { inject, Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly KEY = 'ACCESS_TOKEN';

  constructor(private cookie: CookieService) {}

  getToken(): string | null {
    const token = this.cookie.get(this.KEY);
    return token?.trim() ? token : null;
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Se você já tinha uma validação de expiração, mantenha.
    // Caso não tenha, por enquanto retorna true:
    return true;
  }

  clear(): void {
    this.cookie.delete(this.KEY, '/');
  }
}
