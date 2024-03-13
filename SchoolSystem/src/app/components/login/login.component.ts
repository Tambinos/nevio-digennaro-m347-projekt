import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";
import {User} from "../../entity/User";
import {SubjectsService} from "../../service/subjects.service";
import {GradeService} from "../../service/grade.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password: string = ''
  username: string = ''

  constructor(private userService: UsersService, private router: Router,private subjectService: SubjectsService,private gradeService: GradeService) {
  }

  register() {
    this.userService.createUser(new User(this.username, this.password));
  }

  checkLogin() {
    const loggedInUser = this.userService.users.find(user => user.username === this.username && user.password === this.password);
    if (loggedInUser) {
      this.userService.setLoggedInUser(loggedInUser);
      this.subjectService.updateSubjectsAndAVGGrades();
      this.gradeService.getGradesOfLoggedInUser()
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
