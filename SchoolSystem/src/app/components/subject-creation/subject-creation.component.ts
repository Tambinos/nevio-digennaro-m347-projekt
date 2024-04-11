import {Component, OnDestroy} from '@angular/core';
import {SubjectsService} from "../../services/subjects.service";
import {LanguageService} from "../../services/language.service";
import {ActivatedRoute} from "@angular/router";
import {Subject as RxjsSubject} from "rxjs/internal/Subject";
import {Store} from "@ngrx/store";
import {SubjectGrade} from "../../models/SubjectGrade";
import {Subject} from "../../models/Subject";
import {addSubject, updateSubject} from "../../actions/Subject.action";

@Component({
  selector: 'app-subject-creation',
  templateUrl: './subject-creation.component.html',
  styleUrls: ['./subject-creation.component.scss']
})
export class SubjectCreationComponent implements OnDestroy {
  selectedSubject: string = '';
  subscriptions: RxjsSubject<void> = new RxjsSubject<void>();


  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  constructor(protected subjectService: SubjectsService, protected languageService: LanguageService, private route: ActivatedRoute, private store: Store<{
    subjectGrades: SubjectGrade[],
    subject: Subject[]
  }>) {
  }

  handleSubject() {
    if (this.route.snapshot.url[0].path === 'editSubject') {
      this.store.dispatch(updateSubject({subject: this.selectedSubject, id: this.subjectService.getFocusedSubject().id}))
      this.subjectService.editSubject(this.subjectService.getFocusedSubject(), this.selectedSubject).subscribe();
    } else {
      this.subjectService.addSubject({
        subject: this.selectedSubject
      }).subscribe((data: any) => {
        const subjectData = data as Subject;
        this.store.dispatch(addSubject(subjectData))
      });
    }
  }
}
