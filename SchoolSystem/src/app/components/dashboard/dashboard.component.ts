import {Component, OnDestroy} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {SubjectsService} from "../../services/subjects.service";
import {LanguageService} from "../../services/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeService} from "../../services/grade.service";
import {Subject} from "../../models/Subject";
import {Grade} from "../../models/Grade";
import {map, Observable, of, Subject as RxjsSubject, switchMap, takeUntil} from 'rxjs';
import {SubjectGrade} from "../../models/SubjectGrade";
import {Store} from "@ngrx/store";
import {removeSubject} from "../../actions/Subject.action";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  displayedColumns: string[] = ['subject', 'avgGrade'];
  showPopup: boolean = false;
  subjects: Subject[] = [];
  avgGrades: Grade[] = [];
  subscriptions: RxjsSubject<void> = new RxjsSubject<void>();
  Math: Math = Math;
  subjectGrades$: Observable<SubjectGrade[]> = new Observable<SubjectGrade[]>;
  subjects$: Observable<Subject[]> = new Observable<Subject[]>;

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  constructor(protected subjectService: SubjectsService,
              protected userService: UsersService,
              protected languageService: LanguageService,
              protected translate: TranslateService,
              protected gradeService: GradeService,
              private store: Store<{ subjectGrades: SubjectGrade[], subject: Subject[] }>) {

    if (this.userService.getLoggedInUser().admin) {
      this.displayedColumns = ['subject', 'avgGrade', 'actions'];
    }
    this.subjects$ = this.store.select('subject');
    this.subjectGrades$ = this.store.select('subjectGrades');
    this.updateSubjectsAndAVGGrades();
  }


  updateSubjectsAndAVGGrades(): void {
    this.subjects$
      .pipe(
        takeUntil(this.subscriptions),
        switchMap((subjects: Subject[]) => {
          this.subjects = subjects;
          return this.subjectGrades$.pipe(
            takeUntil(this.subscriptions),
            map((grades: SubjectGrade[]) => {
              return this.subjects.map(subject => {
                const subjectGrades = grades.filter(grade => grade.subject.id === subject.id);
                return this.gradeService.calculateAvgGrades(subjectGrades, subject);
              });
            })
          );
        })
      )
      .subscribe((avgGrades: Grade[]) => {
        this.avgGrades = avgGrades;
      });
  }


  handleEvent(event: boolean, subject: Subject): void {
    if (event) {
      this.store.dispatch(removeSubject(subject));
      this.updateSubjectsAndAVGGrades();
      this.subjectService.deleteSubject(subject).pipe(takeUntil(this.subscriptions)).subscribe();
    }
    this.showPopup = false;
  }

  getAvgGrade(subject: Subject): number {
    let subjectGrade = this.avgGrades.find((grade: Grade) => grade.id === subject.id);
    if (subjectGrade) {
      return subjectGrade.grade;
    } else {
      return 0;
    }
  }
}
