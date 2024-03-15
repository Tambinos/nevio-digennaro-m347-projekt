import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../entity/User";
import {Router} from "@angular/router";
import {SubjectsService} from "./subjects.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loggedInUser: User | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User) {
    this.http.post('http://localhost:8080/api/user/login', user).subscribe((data: any) => {
      if (data) {
        this.setLoggedInUser(data);
        this.router.navigate(['/dashboard']);
      }
    })
  }

  createUser(user: User) {
    this.http.post('http://localhost:8080/api/user/createUser', user).subscribe(() => {
    });
  }

  setLoggedInUser(user: User|undefined) {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUser = user;
  }

  getLoggedInUser(): User {
    if (window.localStorage.getItem('loggedInUser') !== null) {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('loggedInUser'));
    } else {
      return new User("", "");
    }
  }
}
