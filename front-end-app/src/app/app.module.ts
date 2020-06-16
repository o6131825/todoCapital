import { AuthService } from './auth.service';
import { CheckFormService } from './check-form.service';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { FlashMessagesModule} from 'angular2-flash-messages';
import {HttpModule} from '@angular/http';

import {IsLoggedIn} from './isLigged.guart';
import { TaskComponent } from './task/task.component';

import {TaskService} from './shared/task.service';
import { TaskListComponent } from './task-list/task-list.component';






const appRoute: Routes = [
{path: '', component: HomeComponent},
{path: 'reg', component: RegComponent},
{path: 'auth', component: AuthComponent},
{path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn]},
{path: 'task', component: TaskComponent, canActivate: [IsLoggedIn]},
{path: 'tasklist', component: TaskListComponent, canActivate: [IsLoggedIn]}



];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule, FlashMessagesModule.forRoot(),
    // tslint:disable-next-line: deprecation
    HttpModule

  ],
  providers: [CheckFormService, AuthService, IsLoggedIn, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
