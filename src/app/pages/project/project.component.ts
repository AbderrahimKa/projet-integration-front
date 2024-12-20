import { Component, OnInit } from '@angular/core';
import { ProjetService } from './projet.service';
import { Projet } from './projet.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projets: Projet[] = [];
  projetForm: Projet = { nom: '', description: '', budget: 0, dateDebut: '', dateFin: '', skills: '' };

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.listerProjets();
  }

  // Lister tous les projets
  listerProjets(): void {
    this.projetService.getTousLesProjets().subscribe(data => {
      this.projets = data;
    });
  }

  // Ajouter un projet
  ajouterProjet(): void {
    this.projetService.ajouterProjet(this.projetForm).subscribe(() => {
      Swal.fire({
        title: 'Succès',
        text: 'Projet ajouté avec succès !',
        icon: 'success'
      });
      this.listerProjets();
      this.projetForm = { nom: '', description: '', budget: 0, dateDebut: '', dateFin: '', skills: '' }; // Réinitialiser le formulaire
    }, error => {
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout du projet.',
        icon: 'error'
      });
    });
  }

  // Mettre à jour un projet
  mettreAJourProjet(id: number): void {
    this.projetService.mettreAJourProjet(id, this.projetForm).subscribe(() => {
      Swal.fire({
        title: 'Succès',
        text: 'Projet mis à jour avec succès !',
        icon: 'success'
      });
      this.listerProjets();
    }, error => {
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la mise à jour du projet.',
        icon: 'error'
      });
    });
  }

  // Supprimer un projet
  supprimerProjet(id: number): void {
    this.projetService.supprimerProjet(id).subscribe(() => {
      Swal.fire({
        title: 'Succès',
        text: 'Projet supprimé avec succès !',
        icon: 'success'
      });
      this.listerProjets();
    }, error => {
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression du projet.',
        icon: 'error'
      });
    });
  }

  // Remplir le formulaire de projet pour mise à jour
  editerProjet(projet: Projet): void {
    this.projetForm = { ...projet };
  }
}
