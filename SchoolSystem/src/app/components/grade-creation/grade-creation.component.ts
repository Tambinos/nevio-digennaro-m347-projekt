import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeSubject} from "../../entity/GradeSubject";
import {Grade} from "../../entity/Grade";
import {GradeService} from "../../service/grade.service";
import {UsersService} from 'src/app/service/users.service';

@Component({
  selector: 'app-grade-creation',
  templateUrl: './grade-creation.component.html',
  styleUrls: ['./grade-creation.component.scss']
})
export class GradeCreationComponent {
  selectedGrade: number = 0;

  constructor(protected subjectService: SubjectsService, protected gradeService: GradeService, protected userService: UsersService) {

  }

  createGrade(grade: number) {
    this.gradeService.createGrade(new GradeSubject(new Grade(grade), this.subjectService.getFocusedSubject(), this.userService.getLoggedInUser()));
  }
}
