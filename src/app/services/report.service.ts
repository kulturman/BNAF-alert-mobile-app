import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  newReport(data: any)  {
    return axios.post('/api/reports', data);
  }
}
