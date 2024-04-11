import {Component} from '@angular/core';
import {SubjectsService} from "../../services/subjects.service";
import {GradeService} from "../../services/grade.service";
import {UsersService} from 'src/app/services/users.service';
import {LanguageService} from "../../services/language.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "../../models/Subject";
import {Store} from "@ngrx/store";
import {SubjectGrade} from "../../models/SubjectGrade";
import {addSubjectGrade, updateSubjectGrade} from "../../actions/SubjectGrade.action";


@Component({
  selector: 'app-grade-creation',
  templateUrl: './grade-creation.component.html',
  styleUrls: ['./grade-creation.component.scss']
})
export class GradeCreationComponent {
  selectedGrade: number = 1;

  constructor(protected subjectService: SubjectsService,
              protected gradeService: GradeService,
              protected userService: UsersService,
              protected languageService: LanguageService,
              private route: ActivatedRoute,
              private store: Store<{
                subjectGrades: SubjectGrade[],
                subject: Subject[]
              }>
  ) {
  }

  handleGrade() {
    if (this.selectedGrade >= 1 && this.selectedGrade <= 6) {
      if (this.route.snapshot.url[0].path === 'editGrade') {
        this.store.dispatch(updateSubjectGrade({grade: this.selectedGrade}, this.gradeService.getFocusedGrade().id ?? 0));
        this.gradeService.updateGrade(this.gradeService.getFocusedGrade().id ?? 0, {grade: this.selectedGrade})
          .subscribe();
      } else {
        this.gradeService.createGrade({
          grade: {grade: this.selectedGrade},
          subject: this.subjectService.getFocusedSubject(),
          user: this.userService.getLoggedInUser()
        }).subscribe((data) => {
          const gradeData = data as SubjectGrade;
          this.store.dispatch(addSubjectGrade(gradeData));
        })
      }
    } else {
      alert('Invalid Grade');
    }
  }
}
