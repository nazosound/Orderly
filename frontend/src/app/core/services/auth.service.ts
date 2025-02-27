import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginResponse } from '../../shared/models/login.model';
import { UserSession } from '../../shared/models/userSession.interface';
import { UserInterface } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  api = inject(ApiService);

  session = signal<UserSession | null>(this.loadSession());
  user = computed(() => (this.session() ? this.session()!.user : null));
  jwt = computed(() => (this.session() ? this.session()!.jwt : null));
  isAuth = computed(() => this.session() != null);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.api.httpPost<LoginResponse>('Auth/login', { email, password });
  }
  logout(): void {
    this.api.httpPost('Auth/logout', null).subscribe(() => {
      this.removeSession();
    });
  }

  refreshToken(): Observable<LoginResponse> {
    return this.api.httpPost<LoginResponse>('Auth/refresh', null);
  }

  loadSession(): UserSession | null {
    const sessionStr = localStorage.getItem('orderly-session');
    return sessionStr ? (JSON.parse(sessionStr) as UserSession) : null;
  }

  saveSession(user: UserInterface, jwt: string): void {
    this.session.set({
      user,
      jwt,
    });
    localStorage.setItem('orderly-session', JSON.stringify(this.session()));
  }

  removeSession(): void {
    this.session.set(null);
    localStorage.removeItem('orderly-session');
    this.router.navigate(['/login']);
  }

  updateSession(jwt: string): void {
    if (this.session() != null) this.saveSession(this.session()!.user, jwt);
  }
}
