import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  appPages = [
    {
      title: 'Accueil',
      url: '/tabs/tab1',
      icon: 'home'
    },
    {
      title: 'Nouvelle alerte',
      url: '/tabs/tab2',
      icon: 'send'
    },
    {
      title: 'Votre historique',
      url: '/app/tabs/bnaf',
      icon: 'folder'
    }
  ];
  loggedIn = false;
  dark = false;

  logout() {

  }
  constructor() {}
}
