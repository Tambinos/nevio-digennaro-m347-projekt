import { Component } from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeService} from "../../service/grade.service";
import {UsersService} from "../../service/users.service";
import {GradeSubject} from "../../entity/GradeSubject";
import {Grade} from "../../entity/Grade";
import {Subject} from "../../entity/Subject";

@Component({
  selector: 'app-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent {
  selectedSubject: string = '';

  constructor(protected subjectService: SubjectsService) {
  }

  createSubject(subject: string) {
    this.subjectService.addSubject(new Subject(subject));
  }
}
