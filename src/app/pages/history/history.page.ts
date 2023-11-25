import {NgIf, NgStyle} from "@angular/common";
import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {IonicModule, IonLoading} from "@ionic/angular";
import {HISTORY} from "src/app/services/mock-alert-history.service";
import {NgFor} from "@angular/common";
import {Router} from "@angular/router";
import {DbService} from "../../services/db.service";
import {ReportService} from "../../services/report.service";
import {Network} from "@capacitor/network";


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
    private dbService: DbService,
    private reportService: ReportService
  ) {
  }

  async ngAfterViewInit() {
    await this.ionLoading.present();
  }

  async ngOnInit() {
    const status = await Network.getStatus();

    this.dbService.getAll().then(data => {
      let alertsList = [];

      for(let alert of data.values as [{id: number, report: string}]) {
        alertsList.push({
          id: alert.id,
          ...JSON.parse(alert.report as string)
        });
      }
      this.alerts = alertsList;
console.log(this.alerts,this.alerts.length);
      if (status.connected) {
        this.sendData();
      }
    }).finally(async () => {
      await this.ionLoading.dismiss();
    })
    .catch(e => console.log(e));
  }

  async sendData() {
    await this.ionLoading.present();

    for (let alert of this.alerts) {
      let promises = [];

      if (!Array.isArray(alert)) {
        promises.push(this.reportService.newReport(alert));
      }

      Promise.all(promises).then(() => {
        this.dbService.deleteAll();
        this.alerts = [];
      })
      .catch(error => console.log(error));
    }

    await this.ionLoading.dismiss();
  }
}
