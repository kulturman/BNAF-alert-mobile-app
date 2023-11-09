import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonLoading} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {ReportModel} from "../../models/report.model";
import {ReportService} from "../../services/report.service";
import {ActivatedRoute, Router} from "@angular/router";

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
export class AlertsListComponent implements OnInit {
  page = 1;
  alerts: ReportModel[] = [];
  @ViewChild('ionLoading')
  ionLoading!: IonLoading;
  pageType!: string;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageType = params['filter'];
      this.page = 1;
      this.alerts = [];
      this.fetchData(undefined);
    })
  }

  private fetchData(ev: any) {
    //this.ionLoading.present();
    this.reportService.getReports(this.page, this.pageType === 'all')
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
  }

  async onIonInfinite(ev: any) {
    this.getNexPageData(ev);
  }

  private getNexPageData(ev: any) {
    this.fetchData(ev)
  }

  navigateToDetails(alert: ReportModel) {
    this.router.navigate(['/details', alert.id], {
      state: alert
    });
  }
}
