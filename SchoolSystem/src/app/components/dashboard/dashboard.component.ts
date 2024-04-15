import {Component, OnDestroy} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {SubjectsService} from "../../services/subjects.service";
import {LanguageService} from "../../services/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeService} from "../../services/grade.service";
import {Subject} from "../../models/Subject";
import {Observable, Subject as RxjsSubject, takeUntil} from 'rxjs';
import {Store} from "@ngrx/store";
import {loadSubjects, removeSubject} from "../../actions/Subject.action";
import {loadSubjectsGrades} from "../../actions/SubjectGrade.action";
import {AppState} from "../../state/app.state";
import {SubjectsState} from "../../state/subject.state";
import {SubjectGradesState} from "../../state/subject.grades.state";
import {selectAvgGradeBySubjectId} from "../../selectors/avgGradeFeatureSelector";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  displayedColumns: string[] = ['subject', 'avgGrade'];
  showPopup: boolean = false;
  subscriptions: RxjsSubject<void> = new RxjsSubject<void>();
  Math: Math = Math;
  subjectGrades$: Observable<SubjectGradesState> = new Observable<SubjectGradesState>;
  subjects$: Observable<SubjectsState> = new Observable<SubjectsState>;

  constructor(protected subjectService: SubjectsService,
              protected userService: UsersService,
              protected languageService: LanguageService,
              protected translate: TranslateService,
              protected gradeService: GradeService,
              private store: Store<AppState>) {

    if (this.userService.getLoggedInUser().admin) {
      this.displayedColumns = ['subject', 'avgGrade', 'actions'];
    }
    if (this.userService.firstInitiated) {
      this.store.dispatch(loadSubjects());
      this.store.dispatch(loadSubjectsGrades());
      this.userService.firstInitiated = false;
    }
    this.subjects$ = this.store.select('subjects')
    this.subjectGrades$ = this.store.select('subjectGrades')
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }


  handleEvent(event: boolean, subject: Subject): void {
    if (event) {
      this.store.dispatch(removeSubject(subject));
      this.subjectService.deleteSubject(subject).pipe(takeUntil(this.subscriptions)).subscribe();
    }
    this.showPopup = false;
  }

  getAvgGradeBySubjectId(subjectId: number): Observable<number> {
    return this.store.select(selectAvgGradeBySubjectId, {subjectId});
  }
}
