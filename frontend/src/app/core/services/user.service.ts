import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserInterface } from '../../shared/models/user.model';
import { map, Observable } from 'rxjs';
import { EndResultInterface } from '../../shared/models/endresult.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = inject(ApiService);

  getUsers(): Observable<UserInterface[]> {
    return this.api.httpGet<UserInterface[]>('User/getUsers').pipe(
      map((result: EndResultInterface<UserInterface[]>) => {
        if (result.result === false) {
          throw new Error(result.message);
        }
        return result.data;
      })
    );
  }
}
