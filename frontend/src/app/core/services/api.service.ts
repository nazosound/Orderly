import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EndResultInterface } from '../../shared/models/endresult.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://localhost:7065/api/';

  http = inject(HttpClient);

  httpGet<T>(method: string): Observable<EndResultInterface<T>> {
    return this.http.get<EndResultInterface<T>>(`${this.baseUrl}${method}`, {
      withCredentials: true,
    });
  }

  httpPost<T>(method: string, payload: any): Observable<EndResultInterface<T>> {
    return this.http.post<EndResultInterface<T>>(
      `${this.baseUrl}${method}`,
      payload,
      {
        withCredentials: true,
      }
    );
  }
}
