import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { UserInterface } from '../../../shared/models/user.model';
import { catchError, Observable } from 'rxjs';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, AsyncPipe, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  users$: Observable<UserInterface[]> = new Observable();
  errorMessage = signal<string>('');

  constructor() {
    effect(() => {
      if (this.authService.isAuth()) {
        this.users$ = this.userService.getUsers().pipe(
          catchError((err) => {
            this.errorMessage.set(
              `No tiene autorización para consultar los usuarios (${err.message})`
            );
            return [];
          })
        );
      }
    });
  }
}
