import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AlterarSenhaRequest, AuthRequest, AuthResponse, MensagemResponse, RedefinirSenhaRequest } from '../../auth/models/auth.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.api.baseUrlAuth

  constructor(private http:HttpClient, private cookie: CookieService ) { }

 

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.API_URL}/auth/signin`, requestDatas, {
    withCredentials: true
  });
}

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

  recuperarSenha(email: string): Observable<MensagemResponse> {
  return this.http.post<MensagemResponse>(`${this.API_URL}/auth/recuperar-senha`, email, {
    headers: { 'Content-Type': 'application/json' }
  });
}

alterarSenha(requestDatas: AlterarSenhaRequest): Observable<AlterarSenhaRequest>{

    return this.http.put<AlterarSenhaRequest>(`${this.API_URL}/auth/alterar-senha`,requestDatas)
  }

  redefinirSenha(requestDatas: RedefinirSenhaRequest): Observable<RedefinirSenhaRequest>{
    return this.http.post<RedefinirSenhaRequest>(`${this.API_URL}/auth/redefinir-senha`,requestDatas)
  }


}
