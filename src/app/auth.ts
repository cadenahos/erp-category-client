import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthResponse, RegisterRequest } from './model/auth_response.interface';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Ensures AuthService is available globally
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace with your backend URL
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(
    localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData')!) : null
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  register(data: RegisterRequest): Observable<boolean> {
    return this.http.post<void>(`${this.apiUrl}/auth/email/register`, data, { observe: 'response' }).pipe(
      map((response) => response.status === 204),
      catchError((error) => {
        console.error('Registration error:', error);
        return of(false);
      })
    );
  }
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/email/login`, { email, password }).pipe(
      tap((response) => {
        if (response && response.token && response.user) {
          console.log('Login success:', response);
          localStorage.setItem('authData', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      }),
      map((response) => !!(response && response.token)),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): Observable<void> {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    return this.http.post<void>(`${this.apiUrl}/auth/email/logout`, { refreshToken: authData.refreshToken }).pipe(
      tap(() => {
        localStorage.removeItem('authData');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        localStorage.removeItem('authData');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        return of(void 0);
      })
    );
  }

  isAuthenticated(): boolean {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    return !!(authData.token && authData.tokenExpires && authData.tokenExpires > Date.now());
  }

  // Optional: Refresh token
  refreshToken(): Observable<boolean> {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    if (!authData.refreshToken) return of(false);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken: authData.refreshToken }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('authData', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      }),
      map((response) => !!(response && response.token)),
      catchError((error) => {
        console.error('Refresh token error:', error);
        this.logout().subscribe(); // Logout on refresh failure
        return of(false);
      })
    );
  }
}
// export class AuthService {
//   private router = inject(Router); // Use inject() instead of constructor
//   private currentUserSubject = new BehaviorSubject<User | null>(
//     localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null
//   );
//   public currentUser$ = this.currentUserSubject.asObservable();
//
//   login(username: string, password: string): Observable<boolean> {
//     return new Observable((observer) => {
//       setTimeout(() => {
//         // Simulate API delay
//         if (username === 'admin' && password === 'password') {
//           const user: User = { username, token: 'mock-jwt-token-123' };
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.currentUserSubject.next(user);
//           observer.next(true);
//         } else {
//           observer.next(false);
//         }
//         observer.complete();
//       }, 1000);
//     });
//   }
//
//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }
//
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('currentUser');
//   }
// }
