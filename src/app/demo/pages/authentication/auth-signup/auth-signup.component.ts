import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../auth';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    saveDetails: [false]
  });
  isSubmitted = false;
  isLoading = false;
  signupError = '';

  onSubmit() {
    this.isSubmitted = true;
    this.signupError = '';
    if (this.signupForm.valid) {
      this.isLoading = true;
      const { email, password, firstName, lastName, saveDetails } = this.signupForm.value;
      if (saveDetails) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      this.authService.register({ email, password, firstName, lastName }).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.router.navigate(['/login'], { queryParams: { registered: true } });
          } else {
            this.signupError = 'Registration failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.signupError = error.status === 400 ? 'Email already exists' : 'An error occurred. Please try again.';
        }
      });
    }
  }
}
