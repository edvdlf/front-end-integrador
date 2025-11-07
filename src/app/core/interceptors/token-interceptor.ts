import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from '../services/token-service';

const PUBLIC_URLS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/register',
  '/public/'
];

function isPublic(req: HttpRequest<unknown>): boolean {
  const url = req.url.toLowerCase();
  return PUBLIC_URLS.some(p => url.includes(p));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Não anexa token em rotas públicas
  let authReq = req;
  const token = tokenService.getToken();

  console.log('🔍 Interceptor executado para URL:', req.url);
  console.log('Token encontrado:', token ? '✅ SIM' : '❌ NÃO');

  //if (!isPublic(req) && token && tokenService.hasValidToken()) {
    // não sobrescreve Authorization se já existir
   //if (!req.headers.has('Authorization')) {
    //  authReq = req.clone({
     //   setHeaders: {
     //     Authorization: `Bearer ${token}`
     //   }
     // });
    //}
  //}

  if (token && tokenService.hasValidToken()) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Token anexado à requisição:', req.url);
    return next(cloned);
  }

  return next(req);

  //return next(authReq).pipe(
  //  catchError((err: HttpErrorResponse) => {
   //   if (err.status === 401 || err.status === 403) {
   //     // token ausente/expirado/inválido → limpa e manda para login
    //    tokenService.clearToken();
        // opcional: preserve a URL atual para redirecionar após login
    //    router.navigate(['/login'], { queryParams: { redirect: router.url }});
     // }
     // return throwError(() => err);
    //})
  //);
};
