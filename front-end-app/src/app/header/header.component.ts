import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    //  a = localStorage.getItem('userName');



   a: any =null;

   

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    public authService: AuthService
  ) { }


  ngOnInit(): void {
    
    
      this.a = localStorage.getItem('userName')
    
  }

  logoutUser(){
    this.authService.logout();
    
    this.flashMessages.show('Вы вышли из учетной записи', {
      cssClass: 'alert-warning',
      timeout: 4000
    });

    this.router.navigate(['auth']);

    return false;
  }

  thenBlock(){
   
    this.a = localStorage.getItem('userName');
    return true;
  }

  goCNN() {
    window.location.href='http://capitallogistic.by/';
}

}
