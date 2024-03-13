import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../entity/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  loggedInUser: User | undefined;

  constructor(private http: HttpClient) {
    this.updateUsers();
  }

  updateUsers() {
    this.http.get('http://localhost:8080/api/user/getUsers').subscribe((data: any) => {
      this.users = data;
    });
  }
  createUser(user: User) {
    this.http.post('http://localhost:8080/api/user/createUser', user).subscribe(() => {
      this.updateUsers();
    });
  }

  setLoggedInUser(user: User) {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUser = user;
  }

  getLoggedInUser():User {
    return JSON.parse(window.localStorage.getItem('loggedInUser') ?? '');
  }
}
