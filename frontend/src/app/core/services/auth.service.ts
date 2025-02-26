import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LoginResponse } from '../../shared/models/login.model';
import { UserSession } from '../../shared/models/userSession.interface';
import { UserInterface } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = signal<boolean>(false);
  router = inject(Router);
  api = inject(ApiService);

  session = signal<UserSession | null>(this.loadSession());
  user = computed(() => this.session()?.user);
  jwt = computed(() => this.session()?.jwt);

  login(email: string, password: string): Observable<LoginResponse | null> {
    return this.api.httpPost<LoginResponse>('Auth/login', { email, password });
  }
  logout(): void {
    this.api.httpPost('Auth/logout', null).subscribe(() => {
      this.removeSession();
    });
  }

  refreshToken(): Observable<LoginResponse | null> {
    return this.api.httpPost<LoginResponse>('Auth/refresh', null);
  }

  loadSession(): UserSession | null {
    const sessionStr = localStorage.getItem('orderly-session');
    if (!!sessionStr) {
      this.isAuth.set(true);
    }
    return sessionStr ? (JSON.parse(sessionStr) as UserSession) : null;
  }

  saveSession(user: UserInterface, jwt: string): void {
    this.session.set({
      user,
      jwt,
    });
    localStorage.setItem('orderly-session', JSON.stringify(this.session()));
    this.isAuth.set(true);
  }

  removeSession(): void {
    this.session.set(null);
    localStorage.removeItem('orderly-session');
    this.isAuth.set(false);
    this.router.navigate(['/login']);
  }

  updateSession(jwt: string): void {
    this.session.update((currentSession: UserSession | null) => {
      if (currentSession == null) return null;
      return {
        user: currentSession.user,
        jwt,
      };
    });
  }
}
