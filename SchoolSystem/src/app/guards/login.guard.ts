import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from "../service/users.service";

@Injectable({
  providedIn: 'root'
})
export class  LoginGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {
  }
  canActivate(): boolean {
    if (!(this.usersService.getToken() === '')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
