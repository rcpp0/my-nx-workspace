import { Routes } from '@angular/router';

/**
 * Orders feature routes.
 *
 * Lazy-loaded routes for orders pages.
 *
 * @usageNotes
 * Import in app.routes.ts:
 * ```typescript
 * {
 *   path: 'orders',
 *   loadChildren: () => import('@mini-crm/feature-orders').then((m) => m.ORDERS_ROUTES)
 * }
 * ```
 *
 * @category Routing
 */
export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  // TODO: Add order routes when OrderListComponent is implemented
];

