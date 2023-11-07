import { Injectable } from '@angular/core';
import axios from 'axios';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private authService: AuthService) {}

  newReport(data: any)  {
    return axios.post('/api/reports', data);
  }

  getReports(page = 1, all: boolean) {
    const routeParam = all ? '' : '/me';

    return axios.get(`/api/reports${routeParam}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getAudio(reportId: number) {
    return axios.get(`/api/reports/${reportId}/getAudio`);
  }
}
