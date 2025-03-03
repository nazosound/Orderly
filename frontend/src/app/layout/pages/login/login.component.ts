import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginResponse } from '../../../shared/models/login.model';
import { NgIf } from '@angular/common';
import { AppStateService } from '../../../core/services/appstate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authService = inject(AuthService);
  appState = inject(AppStateService);
  router = inject(Router);
  fb = inject(FormBuilder);
  loading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error.set('Invalid Fields');
      return;
    }
    this.loading.set(true);
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: LoginResponse) => {
          if (res.result == false) {
            this.error.set(res.message);
          } else {
            this.authService.saveSession(res.user, res.token);
            this.router.navigate(['/dashboard']);
          }
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error.message);
          this.loading.set(false);
        },
      });
  }
}
