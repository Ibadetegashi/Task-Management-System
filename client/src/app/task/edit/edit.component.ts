// create.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  title: string = '';
  description: string = '';
  errors: any;
  isLoading = false;
  titleLoad = 'Loading';
  task: any;
  selectedUserId!: number;
  selectedStatusId!: number;
  users: any[] = [];
  statuses: any[] = [];
  paramTaskId:any


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private statusService: StatusService,
    private route: ActivatedRoute) {
    
     this.route.params.subscribe((params) => {
     this.paramTaskId = params['id'];
      if (this.paramTaskId) {
        this.getTask(this.paramTaskId);
      }
    });
    }

  ngOnInit(): void {
    this.getUsers();
    this.getStatuses();
  }


  getTask(taskId: number) {
    return this.taskService.getTaskById(taskId).subscribe((task:any) => {
      this.title = task.title
      this.description = task.description;
      this.selectedStatusId = task.statusId
      this.selectedUserId = task.userId
    })
  }

  saveChanges() {
    this.isLoading = true;
    this.titleLoad = 'Updating'
    
    if (this.paramTaskId !== null) {
      const inputData = {
        title: this.title,
        description: this.description
      };

      this.taskService.editTask(inputData,this.paramTaskId).subscribe(
        (res: any) => {
          console.log(res);
          this.changeUser()
          this.changeStatus()
          alert(res.message);
          this.errors = ''     
        },
        err => {
          console.log(err.error.errors, 'err');
          this.errors = err.error.errors
          this.isLoading = false
        },
        () => {
         this.isLoading = false;  
        }
      );
    }
  }
  changeUser() {
    if (this.paramTaskId !== undefined) {
      this.taskService.assignTaskToUser(this.selectedUserId, this.paramTaskId).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
   }
  }

  changeStatus() {
    if (this.paramTaskId !== undefined ) {
      this.statusService.editTaskStatus(this.selectedStatusId,this.paramTaskId).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
   }
  }
   getUsers() {
    return this.userService.getUsers().subscribe((users:any) => {
      this.users = users.data;
    })
  }

  getStatuses() {
    return this.statusService.getStatuses().subscribe((statuses: any) => {
      this.statuses = statuses.data;
    });
  }

}
