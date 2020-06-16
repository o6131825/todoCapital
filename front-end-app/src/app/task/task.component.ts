import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CheckFormService } from '../check-form.service';
import { TaskService } from '../shared/task.service';
import {AuthService} from '../auth.service'


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
  
})
export class TaskComponent implements OnInit {
  name: string;
  descr: string;
  toUser: string;
  taskDonne:boolean;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private taskService: TaskService
    ,public authService: AuthService) { }

  ngOnInit(): void {
    this.refreshUserlist();
  }

  taskCreateClick(){
    const task = {
      name: this.name,
      descr: this.descr,
      toUser: this.toUser,
      taskDonne: this.taskDonne=false
    };

    this.taskService.addTask(task).subscribe(data => {


        this.router.navigate(['/tasklist']);

    });

  }

  //

  refreshUserlist(){
    this.authService.getUserList().subscribe((res) => {
      this.authService.user = res as unknown as AuthService[];
    });
  }

}
