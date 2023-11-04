import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async login(data: any) {console.log(data);
    return axios.post('/api/login', data);
  }
}
