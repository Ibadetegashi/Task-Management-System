import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { CreateComponent } from './task/create/create.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './partials/loader/loader.component';
import { EditComponent } from './task/edit/edit.component';
import { ListComponent } from './task/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateComponent,
    LoaderComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
