import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/status/'
  
  getStatuses() {
    return this.http.get(this.url);
  }

  editTaskStatus(statusId:number,taskId:number) {
    return this.http.put(`${this.url}task/${taskId}`, {statusId} )
  }

}
