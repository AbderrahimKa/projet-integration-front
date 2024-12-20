import { Component, OnInit } from '@angular/core';
import { ReclamationService } from './reclamation.service';
import { Reclamation } from './Reclamation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.recupererToutesReclamations();
  }

  recupererToutesReclamations(): void {
    this.reclamationService.recupererToutesReclamations().subscribe(
      data => this.reclamations = data,
      error => console.error(error)
    );
  }

  ajouterReclamation(): void {
    const nouvelleReclamation: Reclamation = { id: 0, titre: '', description: '', dateCreation: new Date(), statut: 'En attente' };
    
    Swal.fire({
      title: 'Ajouter une réclamation',
      html: `
        <input id="titre" class="swal2-input" placeholder="Titre">
        <textarea id="description" class="swal2-input" placeholder="Description"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const titre = (document.getElementById('titre') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        if (titre && description) {
          return this.reclamationService.ajouterReclamation({ ...nouvelleReclamation, titre, description }).subscribe(
            () => this.recupererToutesReclamations(),
            error => Swal.fire('Erreur', 'Erreur lors de l\'ajout de la réclamation', 'error')
          );
        } else {
          Swal.showValidationMessage('Veuillez remplir tous les champs');
        }
      }
    });
  }

  supprimerReclamation(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette réclamation sera supprimée",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reclamationService.supprimerReclamation(id).subscribe(
          () => {
            this.recupererToutesReclamations();
            Swal.fire('Supprimée!', 'La réclamation a été supprimée.', 'success');
          },
          error => Swal.fire('Erreur', 'Erreur lors de la suppression', 'error')
        );
      }
    });
  }
}
