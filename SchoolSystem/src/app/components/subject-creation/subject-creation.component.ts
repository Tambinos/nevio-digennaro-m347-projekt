import {Component} from '@angular/core';
import {SubjectsService} from "../../service/subjects.service";
import {Subject} from "../../models/Subject";
import {LanguageService} from "../../service/language.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent {
  selectedSubject: string = '';

  constructor(protected subjectService: SubjectsService, protected languageService: LanguageService, private route: ActivatedRoute) {
  }

  handleSubject(subject: string) {
    if (this.route.snapshot.url[0].path === 'editSubject') {
      this.subjectService.editSubject(this.subjectService.getFocusedSubject(), this.selectedSubject);
    }else {
      this.subjectService.addSubject(new Subject(subject));
    }
  }
}
