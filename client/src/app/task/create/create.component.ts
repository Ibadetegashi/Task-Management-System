import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title: string='';
  description!: string
  errors: any
  isLoading = false
  titleLoad = 'Loading'
  //taska e sapo krijuar, i ruhet id ktu edhe tani bohet assigned te kjo id.
  task:any
  selectedUserId!: number
  selectedStatusId!:number
  users: any[] = []
  
  statuses:any[] = []
  
  constructor(private taskService: TaskService, private userService: UserService, private statusService: StatusService,private router: Router) { }
  
  ngOnInit(): void {
    this.getUsers()
    this.getStatuses()
  }

  createTask() {
    this.isLoading = true
    this.titleLoad = 'Saving '
    const inputData = {
      title: this.title,
      description: this.description
    }
    this.taskService.createTask(inputData).subscribe((res:any) => {
      console.log(res);
      this.task = res.data.id 
      this.assignTask()
      this.setStatusToTask()
      alert(res.message);
      this.emptyForm()
      this.router.navigate(['/tasks']);
      
    }, err => {
      console.log(err.error.errors , 'err');
      this.errors = err.error.errors
      this.isLoading = false
      
      
    })
   }
  //FOR TASK ASSIGN TO AN USER
  getUsers() {
    return this.userService.getUsers().subscribe((users:any) => {
      this.users = users.data;
    })
  }

    assignTask() {
    if (this.selectedUserId !== undefined) {
     
      this.taskService.assignTaskToUser(this.selectedUserId, this.task).subscribe(res => {
         console.log(res);
      }, err => {
        console.log('Error', err);
       })
     
    }
    }
  //TO SET STATUS TO A TASK
  getStatuses() {
    return this.statusService.getStatuses().subscribe((statuses: any) => {
      this.statuses = statuses.data;
      console.log(this.statuses);
     })
  }

  setStatusToTask() {
    return this.statusService.editTaskStatus(this.selectedStatusId, this.task).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('Error',err);
    })
  }


  emptyForm() {
    this.title = ''
      this.description = ''
      this.isLoading = false
      this.selectedUserId = -1
      this.selectedStatusId = -1
      this.errors = []
  }

  
  }
  
  
  
  

