import {Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgStyle],
})
export class HomePage {
}
