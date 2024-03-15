import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeService} from "../../service/grade.service";
import {Grade} from "../../entity/Grade";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-gradedashboard',
  templateUrl: './gradedashboard.component.html',
  styleUrls: ['./gradedashboard.component.scss']
})
export class GradedashboardComponent {
  displayedColumns: string[] = ['grade', 'date', 'actions'];

  constructor(protected subjectService: SubjectsService, protected languageService: LanguageService, protected gradeService: GradeService, protected translate: TranslateService) {
  }

  editGrade(gradeId: number) {
    let grade = new Grade(Number.parseFloat(prompt(this.translate.instant('Enter new grade:')) ?? '0'));
    if (grade.grade === 0 || isNaN(grade.grade)) {
      return;
    }
    this.gradeService.updateGrade(grade, gradeId);
  }
}
