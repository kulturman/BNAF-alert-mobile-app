import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserOptions} from "../../models/user-options";
import {AlertController, IonLoading} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  @ViewChild('ionLoading')
  ionLoading!: IonLoading;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  async onLogin(form: NgForm) {
    await this.ionLoading.present();

    this.authService.login({
      ...form.value,
      email: form.value.username
    })
      .then(({data}) => {
        this.authService.saveToken(data.token as string);
        this.router.navigate(['/']);
      })
      .catch(async ({response}) => {
        const message = response?.data?.errors?.email[0] || 'Une erreur est survenue.';

        const alert = await this.alertController.create({
          cssClass: 'error-alert',
          message,
          buttons: ['OK']
        });

        await alert.present();
      })
      .finally(() => {
        this.ionLoading.dismiss();
      })
  }

}
