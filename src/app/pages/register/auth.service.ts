import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Assure que le service est disponible dans toute l'application
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // URL du backend

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<any> {
    const body = { username, password, email };
    return this.http.post(`${this.baseUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
