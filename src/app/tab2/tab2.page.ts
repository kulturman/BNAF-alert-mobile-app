import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Alert} from "../models/user-options";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule]
})
export class Tab2Page {
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
      // this.userData.signup(this.signup.username);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

}
