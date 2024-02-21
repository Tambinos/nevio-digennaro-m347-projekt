import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  password: string;
  loginService: LoginService;
  router: Router;
  numberOfFailedAttempts: number = 0;
  constructor(loginService: LoginService, router: Router) {
    this.username = "";
    this.password = "";
    this.loginService = loginService;
    this.router = router;
  }


  checkLogin() {
    if (this.numberOfFailedAttempts < 3) {
      this.loginService.getMembers().forEach(member => {
        if (member.username === this.username && member.password === this.password) {
          this.loginService.setLoggedInUser(this.loginService.getMemberById(member.id));
          this.router.navigate(['/dashboard'])
        }
        this.numberOfFailedAttempts++;
      })
    }else {
      alert("You have exceeded the number of login attempts. Please try again later.")
    }
  }
}
