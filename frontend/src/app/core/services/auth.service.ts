import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { UserInterface } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsAuthSignal = signal<boolean>(false);
  router = inject(Router);
  user = signal<UserInterface | null>(this.loadUser());
  isAuth(): boolean {
    return this.userIsAuthSignal();
  }
  login(email: string, password: string): Observable<UserInterface | null> {
    return of({ email: email, password: password }).pipe(
      catchError((e) => throwError(() => new Error('Request Error'))),
      delay(2000),
      tap((userData) => {
        this.userIsAuthSignal.set(true);
        const userModel = {
          email: userData.email,
          password: userData.password,
          role: 'ADMINISTRADOR',
        };
        localStorage.setItem('orderly-user', JSON.stringify(userModel));
        this.user.set(userModel);
      }),
      map((m) => this.user())
    );
  }
  logout(): void {
    this.user.set(null);
    localStorage.removeItem('orderly-user');
    this.userIsAuthSignal.set(false);
    this.router.navigate(['/login']);
  }

  loadUser(): UserInterface | null {
    const userStr = localStorage.getItem('orderly-user');
    return userStr ? (JSON.parse(userStr) as UserInterface) : null;
  }

  getUser() {
    return this.user;
  }
}
