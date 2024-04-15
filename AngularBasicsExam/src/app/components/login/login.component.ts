import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../service/role.service';
import { Member } from '../../models/Member';

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
    let allMembers: Member[] = [
      ...this.loginService.members,
      ...this.loginService.superiors,
    ];
    let loginsuccess = false;
    if (this.numberOfFailedAttempts < 3) {
      this.numberOfFailedAttempts++;
      allMembers.forEach((member) => {
        if (
          member.username === this.username &&
          member.password === this.password
        ) {
          loginsuccess = true;
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
    } else {
      alert(
        'You have exceeded the number of login attempts. Please try again later.',
      );
    }
    if (!loginsuccess) alert('Invalid username or password');
  }
}
