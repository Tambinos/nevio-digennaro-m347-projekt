import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {GradedashboardComponent} from './components/gradedashboard/gradedashboard.component';
import {GradeCreationComponent} from './components/grade-creation/grade-creation.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SubjectCreationComponent} from './components/subject-creation/subject-creation.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DeletePopUpComponent } from './components/delete-pop-up/delete-pop-up.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import {subjectGradeReduced} from "./reducers/SubjectGrade.reducer";
import {subjectReduced} from "./reducers/Subject.reducer";
import { EffectsModule } from '@ngrx/effects';
import {SubjectEffects} from "./events/subject.effects";
import {SubjectGradesEffects} from "./events/subjectGrades.effects";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GradedashboardComponent,
    GradeCreationComponent,
    SubjectCreationComponent,
    DeletePopUpComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    TranslateModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({subjectGrades: subjectGradeReduced, subject: subjectReduced}, {}),
    EffectsModule.forRoot([SubjectEffects, SubjectGradesEffects])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
