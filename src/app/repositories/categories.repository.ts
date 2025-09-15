import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../model/categories.model';

interface CategoriesResponse {
  data: Category[];
  hasNextPage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/' + environment.apiVersion || 'http://localhost:3000/api/v1';

  getCategories(): Observable<Category[]> {
    return this.http.get<CategoriesResponse>(`${this.apiUrl}/categories`).pipe(
      tap((response) => console.log('API response for /api/categories:', response)),
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }
  createCategory(category: Partial<Category>): Observable<boolean> {
    return this.http.post<void>(`${this.apiUrl}/categories`, category, { observe: 'response' }).pipe(
      map((response) => response.status === 201 || response.status === 204),
      catchError((error) => {
        console.error('Error creating category:', error);
        return of(false);
      })
    );
  }

  updateCategory(id: string, client: Partial<Category>): Observable<boolean> {
    return this.http.patch<void>(`${this.apiUrl}/categories/${id}`, client, { observe: 'response' }).pipe(
      map((response) => response.status === 200 || response.status === 204),
      catchError((error) => {
        console.error('Error updating category:', error);
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
