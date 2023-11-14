import { Injectable } from '@angular/core';
import axios from 'axios';
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private authService: AuthService) {}

  newReport(data: any)  {
    return axios.post(environment.apiBasePath + '/api/reports', data);
  }

  getReports(page: number, all: boolean) {
    const routeParam = all ? '' : '/me';

    return axios.get(`${environment.apiBasePath}/api/reports${routeParam}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getAudio(reportId: number) {
    return axios.get(`${environment.apiBasePath}/api/reports/${reportId}/getAudio`);
  }
}
