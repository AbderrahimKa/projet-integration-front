import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Fournit ce service au niveau global de l'application
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Modifiez cette URL si nécessaire

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const payload = { email, password }; // Données envoyées dans le corps de la requête
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
}
