import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LanguageService} from "../../services/language.service";
import {loadSubjects} from "../../actions/Subject.action";
import {loadSubjectsGrades} from "../../actions/SubjectGrade.action";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

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

  register() {
    this.userService.createUser({username: this.username, password: this.password}).subscribe(() => {
      window.alert('User created successfully')
    });
  }

  login() {
    this.userService.login({username: this.username, password: this.password}).subscribe((response: any) => {
      this.userService.setToken(response.token)
        this.userService.getMe().subscribe((user) => {
          this.userService.setLoggedInUser(user);
          this.userService.firstInitiated = true;
          this.router.navigate(['/dashboard'])
        })
    });
  }
}
