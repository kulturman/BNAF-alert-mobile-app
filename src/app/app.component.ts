import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";

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
export class AppComponent implements OnInit {
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
      title: "Alertes en attende d'envoi",
      url: '/history',
      icon: 'folder'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(public authService: AuthService) {
    this.authService.notification$.subscribe(isAuthenticated => this.loggedIn = isAuthenticated);
  }
  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();
  }
}
