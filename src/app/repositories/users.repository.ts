import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../model/user.interface';
import { RegisterRequest } from '../model/auth_response.interface';

interface UsersResponse {
  data: User[];
  hasNextPage: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UsersRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/' + environment.apiVersion || 'http://localhost:3000/api/v1';

  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`).pipe(
      tap((response) => console.log('API response for /api/users:', response)),
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }
  createUser(user: RegisterRequest): Observable<boolean> {
    return this.http.post<void>(`${this.apiUrl}/register`, user, { observe: 'response' }).pipe(
      map((response) => response.status === 201 || response.status === 204),
      catchError((error) => {
        console.error('Error creating user:', error);
        return of(false);
      })
    );
  }

  updateUser(id: string, user: Partial<User>): Observable<boolean> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}`, user, { observe: 'response' }).pipe(
      map((response) => response.status === 200 || response.status === 204),
      catchError((error) => {
        console.error('Error updating user:', error);
        return of(false);
      })
    );
  }
  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { observe: 'response' }).pipe(
      map((response) => response.status === 200 || response.status === 204),
      catchError((error) => {
        console.error('Error deleting user:', error);
        return of(false);
      })
    );
  }
}
