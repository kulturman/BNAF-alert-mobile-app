import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule, IonLoading} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {ReportModel} from "../../models/report.model";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ]
})
export class AlertsListComponent implements OnInit, AfterViewInit {
  page = 1;
  alerts: ReportModel[] = [];
  @ViewChild('ionLoading')
  ionLoading!: IonLoading;

  constructor(private reportService: ReportService) {
  }

  ngAfterViewInit() {
    this.ionLoading.present();
  }

  async ngOnInit() {
    this.fetchData(undefined);
  }

  private fetchData(ev: any) {
    setTimeout(() => {
      this.reportService.getMyReports(this.page)
        .then(({data}) => {
          this.ionLoading.dismiss();
          this.alerts = [...this.alerts, ...data.data];

          if (data.data.length > 0) {
            this.page++;
          }

          if (ev) {
            ev.target.complete();
          }
        });
    }, 3000)
  }

  async onIonInfinite(ev: any) {
    this.getNexPageData(ev);
  }

  private getNexPageData(ev: any) {
    this.fetchData(ev)
  }
}
