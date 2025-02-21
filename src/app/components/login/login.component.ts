import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LanguageService} from "../../services/language.service";
import {loadSubjects} from "../../actions/Subject.action";
import {loadSubjectsGrades} from "../../actions/SubjectGrade.action";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password: string = ''
  username: string = ''

  constructor(private userService: UsersService, protected languageService: LanguageService, private store: Store, private router: Router) {
  }

  login() {
    this.userService.login({username: this.username, password: this.password}).subscribe((user: User) => {
      this.userService.setLoggedInUser(user);
      this.router.navigate(['/dashboard'])
    });
  }
}
