import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserInterface } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = inject(ApiService);

  getUsers(): Observable<UserInterface[]> {
    return this.api.httpGet<UserInterface[]>('User/getUsers');
  }
}
