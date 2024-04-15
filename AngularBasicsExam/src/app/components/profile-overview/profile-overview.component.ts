import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { Member } from '../../models/Member';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Superior } from '../../models/Superior';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css',
})
export class ProfileOverviewComponent {
  activeUser: Member | Superior;

  constructor(
    private loginService: RoleService,
    private router: Router,
  ) {
    let user = this.loginService.getById(this.loginService.getLoggedInUserId());
    if (!user) {
      router.navigate(['/login']);
    }
    this.activeUser = user as Member | Superior;
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
        this.loginService.replaceSuperiorMember(this.activeUser);
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
      this.loginService.replaceSuperiorMember(this.activeUser);
    }
  }
}
