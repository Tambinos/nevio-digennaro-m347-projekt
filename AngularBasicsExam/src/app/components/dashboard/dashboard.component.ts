import { Component } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Member} from "../../entity/Member";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeUser: Member | null | undefined;

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
