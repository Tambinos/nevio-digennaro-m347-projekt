import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {SubjectsService} from "../../service/subjects.service";
import {Subject} from "../../entity/Subject";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {GradeService} from "../../service/grade.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['subject', 'avgGrade', 'actions'];

  constructor(protected subjectService: SubjectsService, protected userService: UsersService,protected languageService: LanguageService,protected translate: TranslateService,protected gradeService:GradeService) {
    subjectService.updateSubjectsAndAVGGrades();
  }

  editSubject(subject: Subject) {
    let newSubject = prompt(this.translate.instant('Enter new subject name'));
    if (newSubject) {
      this.subjectService.editSubject(subject, newSubject);
    }
    
  }
  protected readonly Math = Math;
}
