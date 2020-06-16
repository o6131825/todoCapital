import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';

import {tokenNotExpired} from 'angular2-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;
  userName: any;
  
  

  // tslint:disable-next-line: deprecation
  constructor(private http: Http) { }

registerUser(user: any){

  // tslint:disable-next-line: deprecation
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post(
  'account/reg',
  user,
  {headers}).pipe(map((response: any) => response.json()));
}

authUser(user){

  // tslint:disable-next-line: deprecation
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post(
  'account/auth',
  user,
  {headers}).pipe(map((response: any) => response.json()));
}

storeUser(token, user){
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('userName', JSON.stringify(user.name));

this.token = token;
this.user = user;
this.userName= user.name;
}

logout(){
  this.token = null;
  this.user = null;
  this.userName=null;
  localStorage.clear();
}

isLoggedIn(){
  return tokenNotExpired();
}


getUserList(){
  const headers = new Headers();
  return this.http.get(
    'account/task',

    {headers}).pipe(map((response: any) => response.json()));
}

}
