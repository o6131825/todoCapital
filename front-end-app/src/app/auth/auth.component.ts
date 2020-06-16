import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: string;
  password: string;

  constructor(
    public flashMessages: FlashMessagesService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    };

    // tslint:disable-next-line: triple-equals
    if (user.password == undefined) {
      this.flashMessages.show('Введите пароль', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
        if (!data.success) {
          this.flashMessages.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 4000
          });

        } else {
          this.flashMessages.show('Вы авторизованы', {
            cssClass: 'alert-success',
            timeout: 4000
          });
          this.router.navigate(['dashboard']);
          this.authService.storeUser(data.token, data.user);
        }
      });
      
    }

  }
