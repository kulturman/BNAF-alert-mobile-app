import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
})
export class AppComponent {
  appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Nouvelle alerte',
      url: '/new-alert',
      icon: 'send'
    },
    {
      title: 'Votre historique',
      url: '/history',
      icon: 'folder'
    }
  ];
  loggedIn = false;
  dark = false;

  logout() {

  }
}
