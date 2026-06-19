import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'monitoreo',
        loadComponent: () => import('./components/monitoreo/monitoreo.component').then(m => m.MonitoreoComponent)
      },
      {
        path: 'riego',
        loadComponent: () => import('./components/riego/riego.component').then(m => m.RiegoComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./components/reportes/reportes.component').then(m => m.ReportesComponent)
      },
      {
        path: 'admin',
        loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
