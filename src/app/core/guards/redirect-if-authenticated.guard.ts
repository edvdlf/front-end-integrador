import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';


export const redirectIfAuthenticatedGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.hasValidToken()) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
