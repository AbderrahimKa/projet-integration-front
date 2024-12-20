import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contrat {
  id?: number;
  freelance: string;
  client: string;
  dateCreation: string; // Format: ISO 8601
  dateEcheance: string; // Format: ISO 8601
  statut: string; // "En cours", "Terminé", "Annulé"
  signatureElectronique: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContratService {
  private apiUrl = 'http://localhost:8080/auth/contrats';

  constructor(private http: HttpClient) {}

  // Créer un contrat
  creerContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(this.apiUrl, contrat);
  }

  // Obtenir tous les contrats
  obtenirTousLesContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(this.apiUrl);
  }

  // Obtenir un contrat par ID
  obtenirContratParId(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un contrat
  mettreAJourContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.apiUrl}/${id}`, contrat);
  }

  // Supprimer un contrat
  supprimerContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
