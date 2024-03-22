import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {SubjectsService} from "../../service/subjects.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeService} from "../../service/grade.service";
import {GradeSubject} from "../../models/GradeSubject";
import {Subject} from "../../models/Subject";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['subject', 'avgGrade', 'actions'];
  showPopup: boolean = false;

  constructor(protected subjectService: SubjectsService, protected userService: UsersService, protected languageService: LanguageService, protected translate: TranslateService, protected gradeService: GradeService) {
    subjectService.updateSubjectsAndAVGGrades();
  }
  handleEvent(event: any, subject: Subject) {
    if (event) {
      this.subjectService.deleteSubject(subject);
    }
    this.showPopup = false;
  }
  protected readonly Math = Math;
}
