import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs.page'),
    children: [
      {
        path: 'food',
      },
      {
        path: 'fresh',
      },
      {
        path: 'meat',
      },
      {
        path: '',
        redirectTo: '/tabs/food',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/food',
    pathMatch: 'full',
  },
];
