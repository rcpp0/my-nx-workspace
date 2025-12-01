import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

/**
 * Authentication interceptor for HTTP requests.
 *
 * Automatically adds the Bearer token to Authorization header for authenticated requests.
 * Uses the token from AuthService if available.
 *
 * @usageNotes
 * Configure in app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 * ```
 *
 * @see AuthService
 * @category Security
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};

