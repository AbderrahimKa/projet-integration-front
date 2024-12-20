import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../dashboard/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public profiles: any[] = [];
  public selectedProfile: any = null;
  public newProfile: any = { firstName: '', lastName: '', email: '', phoneNumber: '', address: '', skills: '', gender: '' };

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loadProfiles();
  }

  // Charger tous les profils
  loadProfiles() {
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
      },
      error: (error) => {
        Swal.fire('Erreur', 'Impossible de charger les profils', 'error');
      }
    });
  }

  // Créer un nouveau profil
  createProfile() {
    this.profileService.createProfile(this.newProfile).subscribe({
      next: () => {
        this.loadProfiles();
        this.newProfile = { firstName: '', lastName: '', email: '', phoneNumber: '', address: '', skills: '', gender: '' };
        Swal.fire('Succès', 'Profil créé avec succès', 'success');
      },
      error: (error) => {
        Swal.fire('Erreur', 'Impossible de créer le profil', 'error');
      }
    });
  }

  // Supprimer un profil avec confirmation
  deleteProfile(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteProfile(id).subscribe({
          next: () => {
            this.loadProfiles();
            Swal.fire('Supprimé', 'Le profil a été supprimé.', 'success');
          },
          error: (error) => {
            Swal.fire('Erreur', 'Impossible de supprimer le profil', 'error');
          }
        });
      }
    });
  }

  // Mettre à jour un profil
  updateProfile() {
    if (this.selectedProfile && this.selectedProfile.id) {
      this.profileService.updateProfile(this.selectedProfile.id, this.selectedProfile).subscribe({
        next: () => {
          this.loadProfiles();
          this.selectedProfile = null;
          Swal.fire('Succès', 'Profil mis à jour avec succès', 'success');
        },
        error: (error) => {
          Swal.fire('Erreur', 'Impossible de mettre à jour le profil', 'error');
        }
      });
    }
  }
}
