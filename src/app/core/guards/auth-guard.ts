import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';


export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.hasValidToken()) {
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};
