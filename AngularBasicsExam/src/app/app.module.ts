import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { BookingcreationComponent } from './components/bookingcreation/bookingcreation.component';
import { ViewbookingsComponent } from './components/viewbookings/viewbookings.component';
import { EditbookingComponent } from './components/editbooking/editbooking.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { RoleService } from './service/role.service';
import { ProjectService } from './service/project.service';
import { TimeCodeService } from './service/time-code.service';
import { BookingService } from './service/booking.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    LoginComponent,
    DashboardComponent,
    ProfileOverviewComponent,
    BookingcreationComponent,
    ViewbookingsComponent,
    EditbookingComponent,
    AdmindashboardComponent,
  ],
  providers: [
    HttpClientModule,
    RoleService,
    ProjectService,
    TimeCodeService,
    BookingService,
  ],
  bootstrap: [],
  // Your root component here, for example, AppComponent
})
export class AppModule {}
