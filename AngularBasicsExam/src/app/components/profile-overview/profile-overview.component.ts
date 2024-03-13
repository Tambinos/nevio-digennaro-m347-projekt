import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { Member } from '../../entity/Member';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Superior } from '../../entity/Superior';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css',
})
export class ProfileOverviewComponent {
  // @ts-ignore
  activeUser: Member | Superior;

  constructor(
    private loginService: RoleService,
    private router: Router,
  ) {
    if (
      this.loginService.getById(this.loginService.getLoggedInUserId()) ??
      false
    ) {
      this.activeUser = this.loginService.getById(
        this.loginService.getLoggedInUserId(),
      );
    } else {
      router.navigate(['/login']);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  updatePassword() {
    let oldPassword = prompt('Enter old password');
    if (oldPassword != null && oldPassword === this.activeUser?.password) {
      let newPassword = prompt('Enter new password');
      if (newPassword != null && newPassword.length >= 4) {
        this.activeUser.password = newPassword;
        this.loginService.replaceSuperiorMember(
          this.activeUser.id,
          this.activeUser,
        );
      }
    } else {
      alert('Wrong Password');
    }
  }

  updateProfilePicture() {
    const response = prompt('Enter URL to new profile picture') ?? '';
    if (response === '') {
      alert('Invalid URL');
    } else {
      this.activeUser.urlToProfilePicture = response;
      this.loginService.replaceSuperiorMember(
        this.activeUser.id,
        this.activeUser,
      );
    }
  }
}
