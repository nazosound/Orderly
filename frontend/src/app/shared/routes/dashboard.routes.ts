import { Routes } from '@angular/router';
import { DashboardComponent } from '../../layout/pages/dashboard/dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'categories',
    loadComponent: () =>
      import('../../layout/pages/categories/category.component').then(
        (m) => m.CategoryComponent
      ),
    canActivate: [AuthGuard],
  },
];
