import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'new-alert',
        loadComponent: () =>
          import('../pages/new-alert/new-alert.page').then((m) => m.NewAlertPage),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../pages/history/history.page').then((m) => m.HistoryPage),

      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('../pages/alerts-list/alerts-list.component').then((m) => m.AlertsListComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
        import('../pages/alert-details/alert-details.page').then((m) => m.AlertDetailsPage),

      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
