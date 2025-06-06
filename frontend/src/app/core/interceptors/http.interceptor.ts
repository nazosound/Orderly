import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../../shared/models/login.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.sendRequest(req)).pipe(
      catchError((err) => {
        if (err.status === 401 && this.isNotRefreshRequest(req.url)) {
          return this.authService.refreshToken().pipe(
            catchError((er) => {
              if (er.status == 403) this.authService.removeSession();
              return [];
            }),
            tap((res: LoginResponse) => {
              this.authService.updateSession(res.token);
            }),
            switchMap(() => next.handle(this.sendRequest(req)))
          );
        }
        return throwError(() => err);
      })
    );
  }

  private sendRequest(req: HttpRequest<unknown>) {
    let accessToken = this.authService.jwt();
    return accessToken
      ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        withCredentials: true,
      })
      : req.clone({ withCredentials: true });
  }

  private isNotRefreshRequest(url: string): boolean {
    return url.indexOf('Auth/refresh') < 0;
  }
}
