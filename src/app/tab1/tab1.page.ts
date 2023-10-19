import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Camera, CameraResultType} from "@capacitor/camera";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgStyle],
})
export class Tab1Page implements OnInit{
  constructor() {}

  async takePicture () {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    console.log(image)
    const imageUrl = image.webPath;
  };
  ngOnInit(): void {
    this.takePicture().then(r => console.log('eee'));
  }


}
