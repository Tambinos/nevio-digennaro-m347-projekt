import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeService} from "../../service/grade.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeSubject} from "../../models/GradeSubject";

@Component({
  selector: 'app-gradedashboard',
  templateUrl: './gradedashboard.component.html',
  styleUrls: ['./gradedashboard.component.scss']
})
export class GradedashboardComponent {
  displayedColumns: string[] = ['grade', 'date', 'actions'];
  showPopup: boolean = false;

  constructor(protected subjectService: SubjectsService,
              protected languageService: LanguageService,
              protected gradeService: GradeService,
              protected translate: TranslateService) {
  }

  handleEvent(event: any, gradeSubject: GradeSubject) {
    if (event) {
      this.gradeService.deleteGrade(gradeSubject.id ?? 0);
    }
    this.showPopup = false;
  }
}
