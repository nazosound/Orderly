import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginResponse } from '../../shared/models/login.model';
import { UserSession } from '../../shared/models/userSession.interface';
import { UserInterface } from '../../shared/models/user.model';
import { EndResultInterface } from '../../shared/models/endresult.interface';
import { ApiService } from './shared/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  router = inject(Router);
  api = inject(ApiService);

  session = signal<UserSession | null>(this.loadSession());
  user = computed(() => this.session()?.user);
  jwt = computed(() => this.session()?.jwt);
  isAuth = computed(() => this.session() != null);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.api
      .httpPost<LoginResponse>('Auth/login', { email, password })
      .pipe(
        map((result: EndResultInterface<LoginResponse>) => {
          if (result.result === false) {
            throw new Error(result.message);
          }
          return result.data;
        })
      );
  }
  logout(): void {
    this.api.httpPost('Auth/logout', null).subscribe(() => {
      this.removeSession();
    });
  }

  refreshToken(): Observable<LoginResponse> {
    return this.api.httpPost<LoginResponse>('Auth/refresh', null).pipe(
      map((result: EndResultInterface<LoginResponse>) => {
        if (result.result === false) {
          throw new Error(result.message);
        }
        return result.data;
      })
    );
  }

  hasRoleAccess(expectedRoles: string[]): Observable<boolean> {
    const params = new HttpParams().set('roles', expectedRoles.join(','));
    return this.api.httpGet<EndResultInterface<number | null>>('Auth/HasAccess', params).pipe(
      map((response) => response.result),
      catchError(() => of(false))
    );
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
