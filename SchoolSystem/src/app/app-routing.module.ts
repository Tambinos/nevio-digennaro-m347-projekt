import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {GradedashboardComponent} from "./components/gradedashboard/gradedashboard.component";
import {GradeCreationComponent} from "./components/grade-creation/grade-creation.component";
import {SubjectCreationComponent} from "./components/subject-creation/subject-creation.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'gradeDashboard', component: GradedashboardComponent},
  {path: 'createGrade', component: GradeCreationComponent},
  {path: 'createSubject', component: SubjectCreationComponent},
  {path:'editSubject', component: SubjectCreationComponent},
  {path:'editGrade', component: GradeCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
