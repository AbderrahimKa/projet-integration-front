import { Component, OnInit } from '@angular/core';
import { DisponibiliteService } from '../maps/dispo.service';
import { Disponibilite } from '../maps/Disponibilite.model';
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  disponibilites: Disponibilite[] = [];
  freelanceId: number = 1; // Vous pouvez remplacer cela par un ID dynamique selon votre logique
  newDisponibilite: Disponibilite = new Disponibilite(); // Objet pour la création

  constructor(private disponibiliteService: DisponibiliteService) { }

  ngOnInit() {
    this.getDisponibilites();
  }

  // Get disponibilites by freelanceId
  getDisponibilites() {
    this.disponibiliteService.getDisponibilitesByFreelanceId(this.freelanceId)
      .subscribe((data: Disponibilite[]) => {
        this.disponibilites = data;
      });
  }

  // Create a new disponibilite
  createDisponibilite() {
    this.disponibiliteService.createDisponibilite(this.newDisponibilite)
      .subscribe(
        (data: Disponibilite) => {
          this.disponibilites.push(data); // Ajoute la nouvelle disponibilité à la liste
          this.newDisponibilite = new Disponibilite(); // Réinitialise l'objet de création
          // SweetAlert pour succès
          Swal.fire({
            title: 'Disponibilité créée!',
            text: 'La nouvelle disponibilité a été ajoutée.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          // SweetAlert pour erreur
          Swal.fire({
            title: 'Erreur!',
            text: 'Il y a eu un problème lors de la création de la disponibilité.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }

  // Update an existing disponibilite
  updateDisponibilite(disponibilite: Disponibilite) {
    // Nous modifions la disponibilité en utilisant les heures modifiées par l'utilisateur.
    this.disponibiliteService.updateDisponibilite(disponibilite.id, disponibilite)
      .subscribe(
        (data: Disponibilite) => {
          const index = this.disponibilites.findIndex(d => d.id === data.id);
          if (index !== -1) {
            this.disponibilites[index] = data; // Met à jour la disponibilité dans la liste
          }
          // SweetAlert pour succès
          Swal.fire({
            title: 'Disponibilité mise à jour!',
            text: 'La disponibilité a été mise à jour avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          // SweetAlert pour erreur
          Swal.fire({
            title: 'Erreur!',
            text: 'Il y a eu un problème lors de la mise à jour de la disponibilité.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
  

  // Delete a disponibilite
  deleteDisponibilite(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action supprimera définitivement la disponibilité!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disponibiliteService.deleteDisponibilite(id)
          .subscribe(() => {
            this.disponibilites = this.disponibilites.filter(d => d.id !== id); // Supprime la disponibilité de la liste
            // SweetAlert pour succès
            Swal.fire({
              title: 'Disponibilité supprimée!',
              text: 'La disponibilité a été supprimée.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }, (error) => {
            // SweetAlert pour erreur
            Swal.fire({
              title: 'Erreur!',
              text: 'Il y a eu un problème lors de la suppression de la disponibilité.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
