import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../auth';
@Component({
  selector: 'app-auth-signin',
  standalone: true, // Standalone component as per provided metadata
  imports: [RouterModule, ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  isSubmitted = false;
  isLoading = false;
  loginError = '';

  onSubmit() {
    this.isSubmitted = true;
    this.loginError = '';
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([returnUrl]);
          } else {
            this.loginError = 'Invalid username or password';
          }
        },
        error: () => {
          this.isLoading = false;
          this.loginError = 'An error occurred. Please try again.';
        }
      });
    }
  }
}
