import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from '../tables/budget.service'; // Vérifiez le chemin
import Swal from 'sweetalert2'; // Importation de SweetAlert

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  budgets: Budget[] = []; // Liste des budgets
  selectedBudget?: Budget; // Budget sélectionné
  newBudget: Budget = { prevision: 0, depensesReelles: 0, fondsAttribues: 0 }; // Nouveau budget
  ecart?: number; // Variable pour afficher l'écart
  autoRefreshInterval?: any; // Référence pour l'intervalle de rafraîchissement

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.loadBudgets(); // Charger les budgets au démarrage
    this.enableAutoRefresh(); // Activer le rafraîchissement automatique
  }

  ngOnDestroy() {
    this.disableAutoRefresh(); // Désactiver le rafraîchissement automatique lors de la destruction du composant
  }

  // Activer le rafraîchissement automatique toutes les 10 secondes
  enableAutoRefresh(): void {
    this.autoRefreshInterval = setInterval(() => {
      this.loadBudgets();
    }, 10000); // 10 secondes
  }

  // Désactiver le rafraîchissement automatique
  disableAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
    }
  }

  // Charger tous les budgets depuis le service
  loadBudgets(): void {
    this.budgetService.getAllBudgets().subscribe(data => {
      this.budgets = data;
    });
  }

  // Créer ou mettre à jour un budget
  saveBudget(): void {
    this.budgetService.creerOuMettreAJourBudget(this.newBudget).subscribe(() => {
      this.loadBudgets(); // Recharger la liste des budgets
      this.newBudget = { prevision: 0, depensesReelles: 0, fondsAttribues: 0 }; // Réinitialiser le formulaire
      Swal.fire('Succès', 'Budget enregistré avec succès', 'success'); // Notification SweetAlert
    });
  }

  // Sélectionner un budget par ID
  selectBudget(id: number): void {
    this.budgetService.getBudgetById(id).subscribe(data => {
      this.selectedBudget = data;
      Swal.fire('Budget Sélectionné', `Budget ID: ${id} chargé avec succès`, 'info'); // Notification SweetAlert
    });
  }

  // Calculer l'écart pour un budget
  calculateEcart(id: number): void {
    this.budgetService.calculerEcart(id).subscribe(data => {
      this.ecart = data;
      Swal.fire('Écart Calculé', `L'écart pour le budget ID: ${id} est de ${data} €`, 'info'); // Notification SweetAlert
    });
  }

  // Attribuer des fonds à un budget
  allocateFunds(id: number, montant: number): void {
    this.budgetService.attribuerFonds(id, montant).subscribe(() => {
      this.loadBudgets(); // Recharger les budgets
      Swal.fire('Fonds Attribués', `Montant de ${montant} € attribué au budget ID: ${id}`, 'success'); // Notification SweetAlert
    });
  }
}
