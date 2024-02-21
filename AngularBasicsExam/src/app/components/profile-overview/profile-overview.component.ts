import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Member} from "../../entity/Member";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css'
})
export class ProfileOverviewComponent {
  activeUser : Member| null | undefined;
  constructor(private loginService: LoginService, private router: Router) {
    if (this.loginService.getLoggedInUser() ?? false){
      this.activeUser = this.loginService.getLoggedInUser();
    }else {
      router.navigate(['/login']);
    }
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
