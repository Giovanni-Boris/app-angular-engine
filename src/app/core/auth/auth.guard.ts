import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from './services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(JwtService).getToken();

  if (!userService) {
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};
