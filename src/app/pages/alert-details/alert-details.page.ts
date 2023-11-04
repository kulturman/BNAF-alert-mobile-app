import { NgStyle} from "@angular/common";
import { Component} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HISTORY } from "src/app/services/mock-alert-history.service";
import { NgFor } from "@angular/common";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'alert-details',
    templateUrl: './alert-details.page.html',
    styleUrls: ['./alert-details.page.scss'],
    standalone: true,
    imports: [IonicModule, NgStyle, NgFor]
})

export class AlertDetailsPage{

    alert: any;
    constructor(private route: ActivatedRoute){
        this.route.queryParams.subscribe(params => {
            if (params && params['alert']) {
              this.alert = JSON.parse(params['alert']);
            }
          });
    }


}