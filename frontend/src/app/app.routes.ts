import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    loadChildren: () =>
      import('./shared/routes/dashboard.routes').then((m) => m.dashboardRoutes),
    canActivate: [AuthGuard],
  },
];
