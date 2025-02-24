import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../shared/models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  loading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading.set(true);
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(
        catchError((error) => {
          this.error.set(error.message);
          this.loading.set(false);
          return of(null);
        })
      )
      .subscribe((user: UserInterface | null) => {
        console.log('Usuario desde el login', user);
        this.loading.set(false);
        // this.router.navigate(['/dashboard']);
      });
  }
}
