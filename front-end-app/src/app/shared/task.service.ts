import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';

import {Observable} from 'rxjs/Observable';

import {Task} from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: any;

  selectedTask: Task;
  taskList: Task[];



  constructor(private http: Http) { }


  addTask(task: any){

    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
    'http://localhost:3000/account/task',
    task,
    {headers}).pipe(map((response: any) => response.json()));
  }

  getTaskList(){
    
    const headers = new Headers();
    return this.http.get(
      'http://localhost:3000/account/tasklist',
      {headers}).pipe(map((response: any) => response.json()));
  }

  getTaskById(id: string): Observable<Task> {
    const headers = new Headers();
    return this.http.get(
      `http://localhost:3000/account/tasklist/${id}`,
      {headers}).pipe(map((response: any) => response.json()));
    
  }

  updateTask(id: string): Observable<any> {
    const headers = new Headers();
    
    return this.http.put(
    `http://localhost:3000/account/tasklist/${id}`,
      {headers}).pipe(map((response: any) => response.json()));
    
      
  }

  getUpdate(){

  }


  
}




