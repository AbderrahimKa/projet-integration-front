import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './feedback.model'; // Modèle mis à jour

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl: string = 'http://localhost:8080/auth/feedback'; // Correction de l'URL pour POST

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les feedbacks
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}s`); // Utilisez '/feedbacks' pour GET
  }

  // Méthode pour créer un feedback
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.baseUrl, feedback, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Méthode pour récupérer un feedback par son id
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.baseUrl}/${id}`);
  }

  // Méthode pour supprimer un feedback
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
