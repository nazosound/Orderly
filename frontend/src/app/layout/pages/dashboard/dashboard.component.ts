import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { UserInterface } from '../../../shared/models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  users$: Observable<UserInterface[] | null> = new Observable();
  userSignal = computed(() => {
    if (this.authService.isAuth()) {
      this.users$ = this.userService.getUsers();
    }
    return this.authService.user();
  });
}
