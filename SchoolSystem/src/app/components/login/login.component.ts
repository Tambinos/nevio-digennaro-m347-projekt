import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password: string = ''
  username: string = ''

  constructor(private userService: UsersService, protected languageService: LanguageService) {
    this.userService.setLoggedInUser(undefined)
  }

  register() {
    this.userService.createUser({username: this.username, password: this.password});
  }

  login() {
    this.userService.login({username: this.username, password: this.password});
  }
}
