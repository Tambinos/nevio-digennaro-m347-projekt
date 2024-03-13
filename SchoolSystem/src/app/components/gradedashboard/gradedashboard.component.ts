import { Component } from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {UsersService} from "../../service/users.service";
import {Subject} from "../../entity/Subject";
import {GradeService} from "../../service/grade.service";
import {Grade} from "../../entity/Grade";
import {GradeSubject} from "../../entity/GradeSubject";
import {User} from "../../entity/User";

@Component({
  selector: 'app-gradedashboard',
  templateUrl: './gradedashboard.component.html',
  styleUrls: ['./gradedashboard.component.scss']
})
export class GradedashboardComponent {
  displayedColumns: string[] = ['grade', 'date', 'actions'];
  constructor(protected subjectService: SubjectsService, protected userService: UsersService,protected gradeService: GradeService) {
  }

  editGrade(gradeId: number) {
    let grade = new Grade(Number.parseFloat(prompt('Enter new grade:') ?? '0'));
    console.log(grade);
    if (grade.grade === 0 || isNaN(grade.grade)) {
      return;
    }
    this.gradeService.updateGrade(grade, gradeId);
  }
}
