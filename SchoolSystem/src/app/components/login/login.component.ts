import {Component} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";
import {User} from "../../entity/User";
import {SubjectsService} from "../../service/subjects.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";

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
    this.userService.createUser(new User(this.username, this.password));
  }

  login() {
    this.userService.login(new User(this.username, this.password));
  }
}
