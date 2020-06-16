import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name){
    // tslint:disable-next-line: triple-equals
    if (name == undefined) {
    return false;
    }
    else {
    return true;
    }
  }

  checkLogin(login){
    // tslint:disable-next-line: triple-equals
    if (login == undefined) {
    return false;
    }
    else {
    return true;
    }
  }

  checkEmail(email){
    // tslint:disable-next-line: triple-equals
    if (email == undefined) {
    return false;
    }
    else {
    return true;
    }
  }

  checkPassword(password){
    // tslint:disable-next-line: triple-equals
    if (password == undefined) {
    return false;
    }
    else {
    return true;
    }
  }


}
