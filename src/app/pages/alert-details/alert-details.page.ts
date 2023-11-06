import {NgIf, NgStyle} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {NgFor} from "@angular/common";
import {Router} from "@angular/router";
import {ReportService} from "../../services/report.service";


@Component({
  selector: 'alert-details',
  templateUrl: './alert-details.page.html',
  styleUrls: ['./alert-details.page.scss'],
  standalone: true,
  imports: [IonicModule, NgStyle, NgFor, NgIf]
})

export class AlertDetailsPage implements OnInit {
  alert: any;
  audio: string | undefined = '';

  constructor(
    private router: Router,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.alert = this.router.getCurrentNavigation()?.extras.state;
    this.reportService.getAudio(this.alert.id)
      .then(({data}) => {
        this.audio = data.audio;
      })
  }

  base64ToBlob(base64Data: any, contentType: string) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  getAudio() {
    const audioBlob = this.base64ToBlob(this.audio, 'audio/wav');
    return URL.createObjectURL(audioBlob);
  }
  displayImage(image: string) {
    console.log(image)
  }
}
