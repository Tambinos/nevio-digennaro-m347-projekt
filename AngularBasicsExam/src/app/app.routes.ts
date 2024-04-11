import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { BookingcreationComponent } from './components/bookingcreation/bookingcreation.component';
import { ViewbookingsComponent } from './components/viewbookings/viewbookings.component';
import { EditbookingComponent } from './components/editbooking/editbooking.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileOverviewComponent,
  },
  {
    path: 'createBooking',
    component: BookingcreationComponent,
  },
  {
    path: 'viewBookings',
    component: ViewbookingsComponent,
  },
  {
    path: 'editBooking',
    component: EditbookingComponent,
  },
  {
    path: 'adminDashboard',
    component: AdmindashboardComponent,
  },
];
