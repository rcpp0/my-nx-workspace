import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mini-crm/data-access';

/**
 * Authentication guard to protect routes.
 *
 * Redirects to sign-in page if user is not authenticated.
 * Preserves the return URL in query parameters for redirect after login.
 *
 * @usageNotes
 * Apply to routes in routing configuration:
 * ```typescript
 * {
 *   path: 'orders',
 *   canActivate: [authGuard],
 *   loadChildren: () => import('@mini-crm/feature-orders').then((m) => m.ORDERS_ROUTES)
 * }
 * ```
 *
 * @see AuthService
 * @category Security
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/sign-in'], {
    queryParams: { returnUrl: state.url },
  });
};

