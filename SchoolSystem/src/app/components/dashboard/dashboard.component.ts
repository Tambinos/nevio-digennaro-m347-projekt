import {Component, OnDestroy} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {SubjectsService} from "../../service/subjects.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeService} from "../../service/grade.service";
import {Subject} from "../../models/Subject";
import {Grade} from "../../models/Grade";
import {Subject as RxjsSubject, takeUntil} from 'rxjs';

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


  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  constructor(protected subjectService: SubjectsService,
              protected userService: UsersService,
              protected languageService: LanguageService,
              protected translate: TranslateService,
              protected gradeService: GradeService) {
    subjectService.updateSubjectsAndAVGGrades();
    if (this.userService.getLoggedInUser().admin) {
      this.displayedColumns = ['subject', 'avgGrade', 'actions'];
    }
    this.updateSubjectsAndAVGGrades();
  }

  updateSubjectsAndAVGGrades(): void {
    this.subjectService.updateSubjectsAndAVGGrades()
      .pipe(takeUntil(this.subscriptions))
      .subscribe((data: any) => {
        this.subjects = data;
        this.subjects.forEach((subject: Subject) => {
          this.subjectService.getAverageGrade(subject.id ?? 0)
            .pipe(takeUntil(this.subscriptions))
            .subscribe((data: any) => {
              let avgGrade: Grade | undefined = this.avgGrades.find((grade: Grade) => grade.id === subject.id);
              if (!avgGrade) {
                this.avgGrades.push({grade: data, id: subject.id ?? 0});
              } else {
                avgGrade.grade = data;
              }
            })
        })
      });
  }


  handleEvent(event: any, subject: Subject): void {
    if (event) {
      this.subjectService.deleteSubject(subject);
    }
    this.showPopup = false;
    setTimeout(() => {
      this.updateSubjectsAndAVGGrades();
    }, 100)
  }

  getAvgGrade(subject: Subject): number {
    let subjectGrade = this.avgGrades.find((grade: Grade) => grade.id === subject.id);
    if (subjectGrade) {
      return subjectGrade.grade;
    } else {
      return 0;
    }
  }

  Math: Math = Math;
}
