import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from './Reclamation.model'; // Assurez-vous que ce modèle est défini

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:8080/auth/reclamations'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  // Ajouter une réclamation
  ajouterReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiUrl, reclamation);
  }

  // Récupérer toutes les réclamations
  recupererToutesReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }

  // Récupérer une réclamation par ID
  recupererReclamationParId(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une réclamation
  mettreAJourReclamation(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/${id}`, reclamation);
  }

  // Supprimer une réclamation
  supprimerReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
