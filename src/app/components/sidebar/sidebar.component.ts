import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'profil', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Feedback', icon: 'ni-chat-round text-blue', class: '' },
  { path: '/maps', title: 'Disponibilité', icon: 'ni-map-big text-orange', class: '' },
  { path: '/user-profile', title: 'Contrat', icon: 'ni-briefcase-24 text-yellow', class: '' },
  { path: '/tables', title: 'Budget', icon: 'ni-credit-card text-red', class: '' },
  { path: '/project', title: 'Projet', icon: 'ni-folder-17 text-green', class: '' },
  { path: '/reclamation', title: 'Réclamation', icon: 'ni-send text-purple', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: 'hidden' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: 'hidden' }
];


    


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
