import { Routes } from '@angular/router';

/**
 * Authentication feature routes.
 *
 * Lazy-loaded routes for sign-in and sign-up pages.
 *
 * @usageNotes
 * Import in app.routes.ts:
 * ```typescript
 * {
 *   path: 'auth',
 *   loadChildren: () => import('@mini-crm/feature-auth').then((m) => m.AUTH_ROUTES)
 * }
 * ```
 *
 * @category Routing
 */
export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('../sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];

