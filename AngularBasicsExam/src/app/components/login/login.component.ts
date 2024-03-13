import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string;
  password: string;
  loginService: RoleService;
  router: Router;
  numberOfFailedAttempts: number = 0;

  constructor(loginService: RoleService, router: Router) {
    this.username = '';
    this.password = '';
    this.loginService = loginService;
    this.router = router;
    if (this.loginService.getById(this.loginService.getLoggedInUserId())) {
      router.navigate(['/dashboard']);
    }
  }

  checkLogin() {
    if (this.numberOfFailedAttempts < 3) {
      this.loginService.members.forEach((member) => {
        if (
          member.username === this.username &&
          member.password === this.password
        ) {
          while (member.password === '1234' || member.password.length < 4) {
            member.password =
              prompt(
                'Please change your password. Your password must be at least 4 characters long.',
              ) ?? '';
          }
          this.loginService.setMembers(this.loginService.members);
          this.loginService.setLoggedInUserId(member.id);
          this.router.navigate(['/dashboard']);
        }
      });
      this.loginService.superiors.forEach((superior) => {
        if (
          superior.username === this.username &&
          superior.password === this.password
        ) {
          while (superior.password === '1234' || superior.password.length < 4) {
            superior.password =
              prompt(
                'Please change your password. Your password must be at least 4 characters long.',
              ) ?? '';
          }
          this.loginService.setSuperiors(this.loginService.superiors);
          this.loginService.setLoggedInUserId(superior.id);
          this.router.navigate(['/dashboard']);
        }
      });
      this.numberOfFailedAttempts++;
    } else {
      alert(
        'You have exceeded the number of login attempts. Please try again later.',
      );
    }
  }
}
