import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import DashboardComponent from './layout/pages/dashboard/dashboard.component';
import { UnauthorizedPage } from './layout/pages/unathorized/unauthorized-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadComponent: () => DashboardComponent,
    loadChildren: () =>
      import('./shared/routes/dashboard.routes').then((m) => m.dashboardRoutes),
    canActivate: [AuthGuard],
  },
  { path: 'unauthorized', loadComponent: () => UnauthorizedPage }
];
