import { Injectable } from '@angular/core';
import axios from "axios";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async login(data: any) {console.log(data);
    return axios.post('/api/login', data);
  }

  private readonly TOKEN_KEY = 'token';

  private changeAuthStateSource = new Subject<boolean>();
  notification$ = this.changeAuthStateSource.asObservable();

  async saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.notify(true);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  notify(value: boolean) {
    this.changeAuthStateSource.next(value);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.notify(false);
  }
}
