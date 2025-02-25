import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpHandler,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('orderly-jwt');
    let authReq = accessToken
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
          withCredentials: true,
        })
      : req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.authService.refreshToken().pipe(
            tap(() => {
              accessToken = localStorage.getItem('orderly-jwt');
            }),
            switchMap(() =>
              next.handle(
                req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    `Bearer ${accessToken}`
                  ),
                  withCredentials: true,
                })
              )
            )
          );
        }
        return throwError(() => err);
      })
    );
  }
}
