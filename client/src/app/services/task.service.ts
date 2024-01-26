import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
   url = 'http://localhost:3000/task'
  
  createTask(data: object) {
    return this.http.post(`${this.url}`, data);
  }

  assignTaskToUser(userId: number, taskId: number) {
    return this.http.put(`${this.url}`, {userId,taskId})
  }

  getTaskById(taskId: number) {
    return this.http.get(`${this.url}/${taskId}`);
  }

  editTask(data: object, taskId:number) {
    return this.http.put(`${this.url}/${taskId}`, data)
  }

  getTasks() {
    return this.http.get(`${this.url}/`);
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.url}/${taskId}`);
  }

}
