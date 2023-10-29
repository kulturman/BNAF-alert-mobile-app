import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CountryDataService} from "../../services/country-data.service";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RecordingData, VoiceRecorder} from "capacitor-voice-recorder";
import {DateUtil} from "../../shared/dateUtil";
import {Camera, CameraResultType} from "@capacitor/camera";

@Component({
  selector: 'app-tab2',
  templateUrl: 'new-alert.page.html',
  styleUrls: ['new-alert.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, NgForOf, KeyValuePipe, NgClass, NgIf]
})
export class NewAlertPage implements OnInit {
  formGroup: FormGroup;
  regions: any;
  isRecording: boolean = false;
  recordTime: number = 0;
  timerReference: any = 0;
  recordedData: RecordingData | null = null;
  selectedImageUrl: string | undefined;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private countryDataService: CountryDataService,
    private dateUtil: DateUtil
  ) {
    this.formGroup = formBuilder.group({
      region: [''],
      province: [''],
      localite: [''],
      commune: [''],
      structure: [''],
      agent_code: [''],
      nip: [''],
      message: [''],
      repere: [''],
    })
  }

  ngOnInit() {
    this.regions = this.countryDataService.regions;
  }

  async onSubmit() {
    console.log(this.formGroup.value)
  }

  async startRecording() {
    await VoiceRecorder.requestAudioRecordingPermission();
    await VoiceRecorder.startRecording();
    this.isRecording = true;
    this.recordTime = 0;

    this.timerReference = setInterval(() => {
      this.recordTime++;
    }, 1000)
  }

  async stopRecording() {
    this.isRecording = false;
    this.recordedData = await VoiceRecorder.stopRecording();
    clearInterval(this.timerReference);
  }

  displayTime() {
    return this.dateUtil.formatSecondsToMinutes(this.recordTime);
  }

  async deleteRecord() {
    this.recordTime = 0;
    clearInterval(this.timerReference);
    this.isRecording = false;
    this.recordedData = null;
    await VoiceRecorder.stopRecording();
  }

  getAudio() {
    if (!this.recordedData) {
      return "";
    }
    const audioBlob = this.base64ToBlob(this.recordedData?.value?.recordDataBase64, 'audio/wav');
    return URL.createObjectURL(audioBlob);
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.selectedImageUrl = image.webPath;
  };
}
