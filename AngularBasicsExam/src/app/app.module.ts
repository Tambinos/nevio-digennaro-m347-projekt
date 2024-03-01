import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginService} from "./service/login.service";
import {ProfileOverviewComponent} from "./components/profile-overview/profile-overview.component";
import {ProjectService} from "./service/project.service";
import {TimeCodeService} from "./service/time-code.service";
import {BookingcreationComponent} from "./components/bookingcreation/bookingcreation.component";
import {ViewbookingsComponent} from "./components/viewbookings/viewbookings.component";
import {EditbookingComponent} from "./components/editbooking/editbooking.component";
import {AdmindashboardComponent} from "./components/admindashboard/admindashboard.component";
import {BookingService} from "./service/booking.service";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterOutlet,
    LoginComponent,
    DashboardComponent,
    ProfileOverviewComponent,
    BookingcreationComponent,
    ViewbookingsComponent,
    EditbookingComponent,
    AdmindashboardComponent


  ],
  providers: [LoginService, ProjectService, TimeCodeService, BookingService],
  bootstrap: []
})
export class AppModule {

}
