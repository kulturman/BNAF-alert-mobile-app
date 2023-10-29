import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserOptions} from "../../models/user-options";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    console.log(form.value)
  }

}
