import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './task/create/create.component';
import { EditComponent } from './task/edit/edit.component';
import { ListComponent } from './task/list/list.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/tasks', pathMatch: 'full'
  },
  {
    path: 'task/create', component:CreateComponent,title:'Add task'
  },
  {
    path:'task/edit/:id',component:EditComponent,title: 'Edit task'
  },
  {
    path:"tasks",component:ListComponent,title:'List of tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
