import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Verificar si la ruta requiere roles específicos
    const requiredRoles = route.data?.['roles'] as Array<'AGRONOMO' | 'GERENTE' | 'REGULADOR'>;
    if (requiredRoles && !authService.hasRole(requiredRoles)) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  // Redirigir a login si no está autenticado
  router.navigate(['/login']);
  return false;
};
