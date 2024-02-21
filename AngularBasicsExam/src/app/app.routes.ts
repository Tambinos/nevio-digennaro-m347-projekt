import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileOverviewComponent} from "./components/profile-overview/profile-overview.component";

export const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileOverviewComponent}
];
