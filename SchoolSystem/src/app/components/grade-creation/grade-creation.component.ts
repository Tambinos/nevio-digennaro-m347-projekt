import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeSubject} from "../../models/GradeSubject";
import {Grade} from "../../models/Grade";
import {GradeService} from "../../service/grade.service";
import {UsersService} from 'src/app/service/users.service';
import {LanguageService} from "../../service/language.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-grade-creation',
  templateUrl: './grade-creation.component.html',
  styleUrls: ['./grade-creation.component.scss']
})
export class GradeCreationComponent {
  selectedGrade: number = 0;

  constructor(protected subjectService: SubjectsService,
              protected gradeService: GradeService,
              protected userService: UsersService,
              protected languageService: LanguageService,
              protected route: ActivatedRoute) {

  }

  handleGrade(grade: number) {
    if (this.route.snapshot.url[0].path === 'editGrade') {
      this.gradeService.updateGrade(this.gradeService.getFocusedGrade().id ?? 0, new Grade(this.selectedGrade));
    }else {
      this.gradeService.createGrade(new GradeSubject(new Grade(grade), this.subjectService.getFocusedSubject(), this.userService.getLoggedInUser()));
    }
  }
}
