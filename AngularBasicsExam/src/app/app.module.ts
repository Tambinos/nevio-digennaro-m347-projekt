import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginService} from "./service/login.service";
import {ProfileOverviewComponent} from "./components/profile-overview/profile-overview.component";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    LoginComponent,
    DashboardComponent,
    ProfileOverviewComponent
  ],
  providers: [LoginService],
  bootstrap: []
})
export class AppModule {

}
