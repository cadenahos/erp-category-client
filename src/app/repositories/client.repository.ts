import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Client } from '../model/client.model';

interface ClientsResponse {
  data: Client[];
  hasNextPage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsRepository {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api/v1';

  getClients(): Observable<Client[]> {
    return this.http.get<ClientsResponse>(`${this.apiUrl}/clients`).pipe(
      tap((response) => console.log('API response for /api/clients:', response)),
      map((response) => response.data || []),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return of([]);
      })
    );
  }
  createClient(client: Partial<Client>): Observable<boolean> {
    return this.http.post<void>(`${this.apiUrl}/clients`, client, { observe: 'response' }).pipe(
      map((response) => response.status === 201 || response.status === 204),
      catchError((error) => {
        console.error('Error creating client:', error);
        return of(false);
      })
    );
  }

  updateClient(id: string, client: Partial<Client>): Observable<boolean> {
    return this.http.patch<void>(`${this.apiUrl}/clients/${id}`, client, { observe: 'response' }).pipe(
      map((response) => response.status === 200 || response.status === 204),
      catchError((error) => {
        console.error('Error updating client:', error);
        return of(false);
      })
    );
  }
  deleteClient(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${id}`, { observe: 'response' }).pipe(
      map((response) => response.status === 200 || response.status === 204),
      catchError((error) => {
        console.error('Error deleting client:', error);
        return of(false);
      })
    );
  }
}
