import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Alert} from "../../models/user-options";

@Component({
  selector: 'app-tab2',
  templateUrl: 'new-alert.page.html',
  styleUrls: ['new-alert.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class NewAlertPage {
  alert: Alert = {nom: '', prenom: '', nip: '', ville: '', secteur: '', arrondissement:'', structure:'', commentaire: ''};
  submitted = false;

  constructor(
    public router: Router,
  ) {}

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log('Submitting form ...')
      console.log('Form data :'+ JSON.stringify(this.alert))
    }
  }

}
