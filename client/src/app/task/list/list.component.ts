import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  tasks: any
  
  constructor(private taskService: TaskService) {
   this.getTasks()
   }
  getTasks() {
      this.taskService.getTasks().subscribe((tasks:any) => {
      this.tasks = tasks
      console.log(this.tasks);
    })
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe((res:any) => {
      console.log(res);
      this.getTasks()
      alert(res.message)
    }, err => {
      console.log(err);
     })
  }
}
