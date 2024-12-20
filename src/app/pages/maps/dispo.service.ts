// src/app/services/disponibilite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disponibilite } from '../maps/Disponibilite.model';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {
  private baseUrl = 'http://localhost:8080/auth/disponibilites';

  constructor(private http: HttpClient) { }

  createDisponibilite(disponibilite: Disponibilite): Observable<Disponibilite> {
    return this.http.post<Disponibilite>(`${this.baseUrl}`, disponibilite);
  }

  getDisponibilitesByFreelanceId(freelanceId: number): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.baseUrl}/freelance/${freelanceId}`);
  }

  getDisponibiliteById(id: number): Observable<Disponibilite> {
    return this.http.get<Disponibilite>(`${this.baseUrl}/${id}`);
  }

  updateDisponibilite(id: number, disponibilite: Disponibilite): Observable<Disponibilite> {
    return this.http.put<Disponibilite>(`${this.baseUrl}/${id}`, disponibilite);
  }

  deleteDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
