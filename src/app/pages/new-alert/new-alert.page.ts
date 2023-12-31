import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicModule, IonLoading} from '@ionic/angular';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CountryDataService} from "../../services/country-data.service";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RecordingData, VoiceRecorder} from "capacitor-voice-recorder";
import {DateUtil} from "../../shared/dateUtil";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ReportService} from "../../services/report.service";
import {Network} from '@capacitor/network';
import {DbService} from "../../services/db.service";
import { format } from 'date-fns';

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
  provinces = [];
  communes = [];
  isRecording: boolean = false;
  recordTime: number = 0;
  timerReference: any = 0;
  recordedData: RecordingData | null = null;
  selectedImageUrl: string | undefined;
  @ViewChild('ionLoading')
  ionLoading!: IonLoading;
  imageSource: any;

  fieldWeights = {
    'region': 1,
    'province': 1,
    'commune': 1,
    'localite': 2,
    'structure': 1,
    'repere': 2,
    'nip': 1,
    'photo': 3,
    'message': 3,
    'recordingIndicator': 3,
    'espace': 3
  };

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private countryDataService: CountryDataService,
    private dateUtil: DateUtil,
    private reportService: ReportService,
    private alertController: AlertController,
    private dbService: DbService
  ) {
    this.formGroup = formBuilder.group({
      region: [''],
      province: [''],
      localite: [''],
      commune: [''],
      structure: [''],
      agent_code: [''],
      nip: ['', Validators.pattern('^[0-9]{17}$')],
      message: [''],
      repere: [''],
      score: [''],
    })
  }

  async ngOnInit() {
    this.regions = this.countryDataService.regions;
    this.checkFormRelevance();
  }

  async onSubmit() {
    const status = await Network.getStatus();

    const fieldsToCheck = ['region', 'province', 'localite', 'commune', 'structure', 'agent_code', 'nip', 'message', 'repere'];

    if (fieldsToCheck.every(field => !this.formGroup.get(field)?.value)) {
      const alert = await this.alertController.create({
        cssClass: 'error-alert',
        message: 'Veuillez remplir au moins un champ avant de soumettre le formulaire!',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    if (this.formGroup.controls['nip'].errors !== null) {
      const alert = await this.alertController.create({
        cssClass: 'error-alert',
        message: 'Le NIP est invalide',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    if (status.connected) {
      await this.ionLoading.present();

      this.reportService.newReport({
        ...this.formGroup.value,
        audio: this.recordedData?.value?.recordDataBase64,
        photoInput: this.imageSource || null
      }).then(async ({data}) => {
        const alert = await this.alertController.create({
          header: 'Information',
          message: data.message,
          buttons: ['OK'],
        });

        this.formGroup.reset();
        this.imageSource = undefined;
        this.recordedData = null;
        await alert.present();
      })
        .finally(() => {
          this.ionLoading.dismiss();
        });
    }
    else {
      const alert = await this.alertController.create({
        header: 'Hors connexion',
        message: "Votre connexion semble interrompue. Vos données ont été enregistrées localement et seront automatiquement transmises dès que la connexion sera rétablie.",
        buttons: ['OK'],
      });

      await this.dbService.saveReport({
        ...this.formGroup.value,
        audio: this.recordedData?.value?.recordDataBase64,
        photoInput: this.imageSource || null,
        clientDate: format(new Date(), 'yyyy-MM-dd HH:mm'),
      });

      //Refactor later to prevent duplication
      await this.ionLoading.dismiss();
      this.formGroup.reset();
      this.imageSource = undefined;
      this.recordedData = null;
      await alert.present();
    }
  }

  async handleConnectedSubmit() {
    try {
      await this.ionLoading.present();

      const reportData = {
        ...this.formGroup.value,
        audio: this.recordedData?.value?.recordDataBase64,
        photoInput: this.imageSource || null
      };

      const { data } = await this.reportService.newReport(reportData);

      await this.showAlert('Information', data.message);
    } catch (error) {
      console.error('Erreur lors de la soumission du rapport:', error);
    } finally {
      await this.ionLoading.dismiss();
      this.resetForm();
    }
  }

  async handleOfflineSubmit() {
    await this.dbService.saveReport({
      ...this.formGroup.value,
      audio: this.recordedData?.value?.recordDataBase64,
      photoInput: this.imageSource || null,
      clientDate: format(new Date(), 'yyyy-MM-dd HH:mm'),
    });

    await this.showAlert('Hors connexion', 'Votre connexion semble interrompue. Vos données ont été enregistrées localement et seront automatiquement transmises dès que la connexion sera rétablie.');

    await this.ionLoading.dismiss();
    this.resetForm();
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'error-alert',
    });

    await alert.present();
  }

  resetForm() {
    this.formGroup.reset();
    this.imageSource = undefined;
    this.recordedData = null;
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
    this.checkFormRelevance()
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
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.imageSource = image.dataUrl;
  /*  if (this.imageSource !== undefined) {
      this.checkFormRelevance()
    }*/
    this.selectedImageUrl = image.webPath;

  };

  handleRegionChange(e: any) {
    this.provinces = this.countryDataService.getProvincesByRegion(e.detail.value as string);
    this.handleProvinceChange(e);
    this.checkFormRelevance();
  }

  handleProvinceChange(e: any) {
    this.communes = this.countryDataService.getCommunesByProvince(e.detail.value as string);
    this.checkFormRelevance();
  }

  checkFormRelevance() {
    const formControls = Array.from(document.querySelectorAll('.form-control')) as HTMLInputElement[];

    const filledFields = Array.from(formControls)
      .filter((element: HTMLInputElement) => {
        return element.value && this.fieldWeights.hasOwnProperty(element.id);
      })
      .reduce((sum, element) => {
        return sum + (this.fieldWeights[element.id as keyof typeof this.fieldWeights] || 0);
      }, 0);

    this.toggleVisibility('.form-irrelevant, .form-irrelevant_orange, .form-relevant', false);
   /* console.log("CALCUL SCENTIFIQUE", filledFields)*/
    if (filledFields > 12) {
      this.toggleVisibility('.form-relevant', true);
    } else if (filledFields >= 5) {
      this.toggleVisibility('.form-irrelevant_orange', true);
    } else {
      this.toggleVisibility('.form-irrelevant', true);
    }

    this.formGroup.get('score')?.setValue(filledFields);
  }

  toggleVisibility(selector: string, isVisible: boolean) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.toggle('hidden', !isVisible);
    });
  }

}
