import { Component, OnInit } from '@angular/core';
import { ContratService, Contrat } from '../user-profile/contrat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  contrats: Contrat[] = [];
  contratForm: Contrat = {
    id: 0, // Initialiser l'ID à 0 (il peut être mis à jour lors de l'édition)
    freelance: '',
    client: '',
    dateCreation: '',
    dateEcheance: '',
    statut: '',
    signatureElectronique: '',
  };

  constructor(private contratService: ContratService) { }

  ngOnInit(): void {
    this.obtenirContrats();
  }

  // Charger tous les contrats
  obtenirContrats(): void {
    this.contratService.obtenirTousLesContrats().subscribe(
      data => {
        this.contrats = data;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les contrats.',
        });
      }
    );
  }

  // Ajouter un contrat
  ajouterContrat(): void {
    if (!this.contratForm.freelance || !this.contratForm.client || !this.contratForm.statut) {
      Swal.fire({
        icon: 'warning',
        title: 'Champ manquant',
        text: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }

    this.contratService.creerContrat(this.contratForm).subscribe(
      data => {
        this.contrats.push(data);
        Swal.fire({
          icon: 'success',
          title: 'Contrat créé',
          text: 'Le contrat a été créé avec succès.',
        });
        this.resetForm();
        this.obtenirContrats(); // Rafraîchissement automatique
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de créer le contrat.',
        });
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.contratForm = {
      id: 0, // Réinitialiser l'ID à 0 lors de l'ajout
      freelance: '',
      client: '',
      dateCreation: '',
      dateEcheance: '',
      statut: '',
      signatureElectronique: '',
    };
  }

  // Méthode pour éditer un contrat
  editerContrat(contrat: Contrat): void {
    this.contratForm = {
      id: contrat.id,
      freelance: contrat.freelance,
      client: contrat.client,
      dateCreation: contrat.dateCreation,
      dateEcheance: contrat.dateEcheance,
      statut: contrat.statut,
      signatureElectronique: contrat.signatureElectronique
    };
  }

  // Supprimer un contrat
  supprimerContrat(id: number): void {
    this.contratService.supprimerContrat(id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Contrat supprimé',
          text: 'Le contrat a été supprimé avec succès.',
        });
        this.obtenirContrats(); // Rafraîchissement automatique
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer le contrat.',
        });
      }
    );
  }
}
