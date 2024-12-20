import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8080/auth/profiles'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les profils
  getAllProfiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Récupérer un profil par ID
  getProfileById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Créer un nouveau profil
  createProfile(profile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, profile);
  }

  // Mettre à jour un profil
  updateProfile(id: number, profile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, profile);
  }

  // Supprimer un profil
  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Récupérer les projets compatibles avec un profil
  getProjetsForProfile(profilId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projets`, { params: { profilId: profilId.toString() } });
  }
}
