import { Component } from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {GradeService} from "../../service/grade.service";
import {UsersService} from "../../service/users.service";
import {GradeSubject} from "../../entity/GradeSubject";
import {Grade} from "../../entity/Grade";
import {Subject} from "../../entity/Subject";
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent {
  selectedSubject: string = '';

  constructor(protected subjectService: SubjectsService, protected languageService:LanguageService) {
  }

  createSubject(subject: string) {
    this.subjectService.addSubject(new Subject(subject));
  }
}
