import { NgStyle} from "@angular/common";
import { Component} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HISTORY } from "src/app/services/mock-alert-history.service";
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";


@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
    standalone: true,
    imports: [IonicModule, NgStyle, NgFor]
})

export class HistoryPage{

    alerts: any[] = [];
    constructor(private router: Router){
        this.getAlerts();
    }

getAlerts() {
    
    this.alerts = HISTORY
    }
    
navigateToDetails(alert: any) {
    this.router.navigate(['/details'], {
        queryParams: {
        alert: JSON.stringify(alert)
        }
    });
    }
    
}