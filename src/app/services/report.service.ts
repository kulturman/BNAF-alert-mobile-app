import { Injectable } from '@angular/core';
import {GenericMessage} from "../models/generic-message";
import {HttpClient} from "@angular/common/http";
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  //constructor(private http: HttpClient) { }

  newReport(data: any)  {
    return axios.post('/api/reports', data);
  }
}
