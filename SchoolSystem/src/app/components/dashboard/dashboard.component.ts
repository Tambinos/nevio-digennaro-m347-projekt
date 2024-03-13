import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {SubjectsService} from "../../service/subjects.service";
import {Subject} from "../../entity/Subject";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['subject', 'avgGrade', 'actions'];

  constructor(protected subjectService: SubjectsService, protected userService: UsersService) {
  }

  editSubject(subject: Subject) {
    let newSubject = prompt('Enter new subject name');
    if (newSubject) {
      this.subjectService.editSubject(subject, newSubject);
    }
  }

  deleteSubject(subject: Subject) {
    this.subjectService.deleteSubject(subject);
  }
}
