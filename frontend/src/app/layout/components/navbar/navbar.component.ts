import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangService } from '@/core/services/shared/lang.service';
import { AuthService } from '@/core/services/auth.service';
import { AppStateService } from '@/core/services/appstate.service';

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
  words = inject(LangService).words();
  showMenu = signal<boolean>(false);
  tabs = [
    { id: 1, name: this.words.NAVBAR_HOME, path: '/dashboard' },
    { id: 2, name: this.words.NAVBAR_ACCOUNTS, path: 'accounts' },
    { id: 3, name: this.words.NAVBAR_CATEGORIES, path: '/dashboard/categories' },
    { id: 4, name: this.words.NAVBAR_PRODUCTS, path: 'products' },
    { id: 5, name: this.words.NAVBAR_USERS, path: 'users' },
    { id: 6, name: this.words.NAVBAR_REPORTS, path: 'reports' },
  ];

  Navigate(tab: { id: number; name: string; path: string }) {
    this.appState.appState.set({
      ...this.appState.appState(),
      currentPage: tab.name,
    });
  }
}
