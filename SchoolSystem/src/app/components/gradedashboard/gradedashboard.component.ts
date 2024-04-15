import {Component, OnDestroy} from '@angular/core';
import {SubjectsService} from "../../services/subjects.service";
import {GradeService} from "../../services/grade.service";
import {LanguageService} from "../../services/language.service";
import {TranslateService} from "@ngx-translate/core";
import {SubjectGrade} from "../../models/SubjectGrade";
import {Subject as RxjsSubject} from "rxjs/internal/Subject";
import {map, Observable, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {removeSubjectGrade} from "../../actions/SubjectGrade.action";
import {SubjectGradesState} from "../../state/subject.grades.state";

@Component({
  selector: 'app-gradedashboard',
  templateUrl: './gradedashboard.component.html',
  styleUrls: ['./gradedashboard.component.scss']
})
export class GradedashboardComponent implements OnDestroy {
  displayedColumns: string[] = ['grade', 'date', 'actions'];
  showPopup: boolean = false;
  subscriptions: RxjsSubject<void> = new RxjsSubject<void>();
  grades$: Observable<SubjectGrade[]> = new Observable<SubjectGrade[]>();

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }


  constructor(protected subjectService: SubjectsService,
              protected languageService: LanguageService,
              protected gradeService: GradeService,
              protected translate: TranslateService,
              private store: Store<{
                subjectGrades: SubjectGradesState,
              }>) {
    this.grades$ = this.store.select('subjectGrades').pipe(
      takeUntil(this.subscriptions),
      map((state: SubjectGradesState) => state.subjectGrades
        .filter((grade: SubjectGrade) => grade.subject.id === this.subjectService.getFocusedSubject().id)
      )
    );
  }


  handleEvent(event: boolean, gradeSubject: SubjectGrade) {
    if (event) {
      this.store.dispatch(removeSubjectGrade(gradeSubject));
      this.gradeService.deleteGrade(gradeSubject.id ?? 0)
        .pipe(takeUntil(this.subscriptions))
        .subscribe(() => {
        });
    }
    this.showPopup = false;
  }
}
