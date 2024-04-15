import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from "../services/users.service";
import {removeSubjectGrade} from "../actions/SubjectGrade.action";

@Injectable({
  providedIn: 'root'
})
export class  LoginGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {
  }
  canActivate(): boolean {
    if (this.usersService.getToken() === '') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
