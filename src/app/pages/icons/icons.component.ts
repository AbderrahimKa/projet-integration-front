import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service'; // Assurez-vous que le chemin est correct
import { Feedback } from './feedback.model'; 

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public feedbacks: Feedback[] = [];
  public newFeedback: Feedback = { id: 0, commentaire: '', rating: 0, date: '' }; // Pour créer un nouveau feedback

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    // Charger tous les feedbacks au démarrage
    this.loadFeedbacks();
  }

  // Charger tous les feedbacks
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
    });
  }

  // Ajouter un nouveau feedback
  addFeedback(): void {
    this.feedbackService.createFeedback(this.newFeedback).subscribe((feedback) => {
      this.feedbacks.push(feedback); // Ajoutez le feedback créé à la liste
      this.newFeedback = { id: 0, commentaire: '', rating: 0, date: '' }; // Réinitialiser le formulaire
    });
  }

  // Supprimer un feedback par son id
  deleteFeedback(id: number): void {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.feedbacks = this.feedbacks.filter(f => f.id !== id); // Supprimer localement le feedback
    });
  }
}
