import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import CategoryComponent from '@/layout/pages/categories/category-list.component';
import { RoleGuard } from '@/core/guards/role.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'categories',
    loadComponent: () => CategoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMINISTRADOR']
    }

  }, {
    path: 'accounts',
    loadComponent: () => CategoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['SALES']
    }
  },
];
