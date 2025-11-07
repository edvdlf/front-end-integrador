import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthRequest, AuthResponse } from '../../auth/models/auth.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.api.baseUrlAuth

  constructor(private http:HttpClient, private cookie: CookieService ) { }

  //registerUser(requestDatas: RegisterUserRequest): Observable<RegisterUserResponse>{
    //return this.http.post<RegisterUserResponse>(`${this.API_URL}/auth/register`,requestDatas)
  //}



  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.API_URL}/auth/signin`, requestDatas, {
    withCredentials: true
  });
}

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

}
