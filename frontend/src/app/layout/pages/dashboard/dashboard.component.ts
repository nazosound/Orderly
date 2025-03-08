import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { UserInterface } from '../../../shared/models/user.model';
import { catchError, Observable } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../../../core/services/appstate.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterModule, TitleCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  appState = inject(AppStateService);
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
