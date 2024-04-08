import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {GradedashboardComponent} from "./components/gradedashboard/gradedashboard.component";
import {GradeCreationComponent} from "./components/grade-creation/grade-creation.component";
import {SubjectCreationComponent} from "./components/subject-creation/subject-creation.component";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  {path: 'gradeDashboard', component: GradedashboardComponent, canActivate: [LoginGuard]},
  {path: 'createGrade', component: GradeCreationComponent, canActivate: [LoginGuard]},
  {path: 'createSubject', component: SubjectCreationComponent, canActivate: [LoginGuard]},
  {path: 'editSubject', component: SubjectCreationComponent, canActivate: [LoginGuard]},
  {path: 'editGrade', component: GradeCreationComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
