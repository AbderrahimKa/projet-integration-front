import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Budget {
  id?: number;
  prevision: number;
  depensesReelles: number;
  fondsAttribues: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/auth/budgets';

  constructor(private http: HttpClient) {}

  // Créer ou mettre à jour un budget
  creerOuMettreAJourBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.baseUrl, budget);
  }

  // Obtenir tous les budgets
  getAllBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.baseUrl);
  }

  // Obtenir un budget par ID
  getBudgetById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${id}`);
  }

  // Calculer l'écart entre prévision et dépenses réelles
  calculerEcart(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ecart/${id}`);
  }

  // Attribuer des fonds à un budget
  attribuerFonds(id: number, montant: number): Observable<Budget> {
    const params = new HttpParams().set('montant', montant.toString());
    return this.http.put<Budget>(`${this.baseUrl}/attribuer-fonds/${id}`, {}, { params });
  }
}
