import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
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

  handleGrade() {
    if (this.route.snapshot.url[0].path === 'editGrade') {
      this.gradeService.updateGrade(this.gradeService.getFocusedGrade().id ?? 0, {grade: this.selectedGrade});
    } else {
      this.gradeService.createGrade({
        grade: {grade: this.selectedGrade},
        subject: this.subjectService.getFocusedSubject(),
        user: this.userService.getLoggedInUser()
      });
    }
  }
}
