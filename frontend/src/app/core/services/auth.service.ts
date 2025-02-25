import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { UserInterface } from '../../shared/models/user.model';
import { ApiService } from './api.service';
import { ApiResponse } from '../../shared/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsAuthSignal = signal<boolean>(false);
  router = inject(Router);
  api = inject(ApiService);
  user = signal<UserInterface | null>(this.loadUser());

  isAuth(): boolean {
    return this.userIsAuthSignal();
  }
  login(email: string, password: string): Observable<ApiResponse | null> {
    return this.api
      .httpPost<ApiResponse>('Auth/login', { email, password })
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.log('Error From Data', error);
            return of(null);
          })
        ),
        tap((loginResponse: ApiResponse | null) => {
          if (loginResponse != null && loginResponse.result != false) {
            this.userIsAuthSignal.set(true);
            localStorage.setItem(
              'orderly-user',
              JSON.stringify(loginResponse.user)
            );
            localStorage.setItem('orderly-jwt', loginResponse.token);
            this.user.set(loginResponse.user);
          }
        })
      );
  }
  logout(): void {
    this.api
      .httpPost<ApiResponse>('Auth/logout', null)
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.log('Error From Data', error);
            return of(null);
          })
        )
      )
      .subscribe((response: ApiResponse | null) => {
        if (response != null) {
          this.user.set(null);
          localStorage.removeItem('orderly-user');
          localStorage.removeItem('orderly-jwt');
          this.userIsAuthSignal.set(false);
          this.router.navigate(['/login']);
        }
      });
  }

  loadUser(): UserInterface | null {
    const userStr = localStorage.getItem('orderly-user');
    if (userStr) {
      this.userIsAuthSignal.set(true);
    }
    return userStr ? (JSON.parse(userStr) as UserInterface) : null;
  }

  getUser() {
    return this.user;
  }

  refreshToken(): Observable<ApiResponse | null> {
    return this.api.httpPost<ApiResponse>('Auth/refresh', null).pipe(
      catchError((error) =>
        throwError(() => {
          console.log('Error From Data', error);
          return of(null);
        })
      ),
      tap((loginResponse: ApiResponse | null) => {
        if (loginResponse != null && loginResponse.result != false) {
          localStorage.setItem('orderly-jwt', loginResponse.token);
        }
      })
    );
  }
}
