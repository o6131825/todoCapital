import { Component, OnInit } from '@angular/core';
import {TaskService} from '../shared/task.service';
import {NgForm} from '@angular/forms';
import {Task} from '../shared/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})

export class TaskListComponent implements OnInit {

  a: any;
  

  constructor(
    public tasklistServise: TaskService,
    private router: Router
      ) { }

  ngOnInit(): void {
    this.refreshTasklist();
    
    
  }


refreshTasklist(){
  
  this.tasklistServise.getTaskList().subscribe((res) => {
    this.tasklistServise.taskList = res as unknown as Task[];
  });
}

/////

state: boolean = false;
isAllowed = (toUser) => {
  return '"'+ toUser +'"' ===  localStorage.getItem('userName') || localStorage.getItem('userName')==='"k.alekseev"' ? true : this.state;
}


////////////////

getTaskdtId(_id){
  
  this.tasklistServise.getTaskById(_id).subscribe((res) => {
    this.tasklistServise.taskList = res as unknown as Task[];
  });
}



checkboxCheck2(_id){
  

  this.tasklistServise.updateTask(_id.toString()).subscribe(data => {


    this.router.navigate(['/tasklist']);

});
  
}


/////

}
