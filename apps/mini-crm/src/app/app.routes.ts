import { Routes } from '@angular/router';
import { authGuard } from '@mini-crm/feature-auth';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@mini-crm/feature-auth').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@mini-crm/feature-orders').then((m) => m.ORDERS_ROUTES),
  },
];
