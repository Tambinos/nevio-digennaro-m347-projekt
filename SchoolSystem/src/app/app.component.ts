import {Component} from '@angular/core';
import {loadSubjects} from "./actions/Subject.action";
import {loadSubjectsGrades} from "./actions/SubjectGrade.action";
import {Subject} from "./models/Subject";
import {SubjectGrade} from "./models/SubjectGrade";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SchoolSystem';

  constructor(private store: Store<{ subjectGrades: SubjectGrade[], subject: Subject[] }>) {
    this.store.dispatch(loadSubjects());
    this.store.dispatch(loadSubjectsGrades());
  }
}
