import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://localhost:7065/api/';

  http = inject(HttpClient);

  httpGet<T>(method: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${method}`, {
      withCredentials: true,
    });
  }

  httpPost<T>(method: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${method}`, payload, {
      withCredentials: true,
    });
  }
}
