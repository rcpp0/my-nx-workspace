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
    loadComponent: () =>
      import('../order-list/order-list.component').then(
        (m) => m.OrderListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../order-add/order-add.component').then(
        (m) => m.OrderAddComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../order-edit/order-edit.component').then(
        (m) => m.OrderEditComponent
      ),
  },
];

