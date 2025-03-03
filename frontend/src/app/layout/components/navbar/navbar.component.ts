import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AppStateService } from '../../../core/services/appstate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: `

  `,
  imports: [NgClass, RouterModule],
})
export class NavbarComponent {
  authService = inject(AuthService);
  appState = inject(AppStateService);
  showMenu = signal<boolean>(false);
  tabs = [
    { id: 1, name: 'Home', path: '/dashboard' },
    { id: 2, name: 'Accounts', path: 'accounts' },
    { id: 3, name: 'Categories', path: '/dashboard/categories' },
    { id: 4, name: 'Products', path: 'products' },
    { id: 5, name: 'Users', path: 'users' },
    { id: 6, name: 'Reports', path: 'reports' },
  ];

  Navigate(tab: { id: number; name: string; path: string }) {
    console.log(tab);
    this.appState.appState.set({
      ...this.appState.appState(),
      currentPage: tab.name,
    });
  }
}
