import {NgIf, NgStyle} from "@angular/common";
import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {IonicModule, IonLoading} from "@ionic/angular";
import {HISTORY} from "src/app/services/mock-alert-history.service";
import {NgFor} from "@angular/common";
import {Router} from "@angular/router";
import {DbService} from "../../services/db.service";


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, NgStyle, NgFor, NgIf]
})

export class HistoryPage implements OnInit, AfterViewInit {
  alerts: any[] = [];
  @ViewChild('ionLoading')
  ionLoading!: IonLoading;

  constructor(
    private router: Router,
    private dbService: DbService
  ) {
  }

  async ngAfterViewInit() {
    await this.ionLoading.present();
  }

  async ngOnInit() {
    this.dbService.getAll().then(data => {
      this.alerts = data.values as [];
    }).finally(async () => {
      await this.ionLoading.dismiss();
    });
  }

  navigateToDetails(alert: any) {
    this.router.navigate(['/details'], {
      queryParams: {
        alert: JSON.stringify(alert)
      }
    });
  }

}
