import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs";
import {Subject as SubjectRxjs} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private loggedInUser: User | undefined;
  private subscriptions: SubjectRxjs<void> = new SubjectRxjs<void>();


  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  login(user: User) {
    this.http.post('http://localhost:8080/api/user/login', user).subscribe((data: any) => {
      this.setToken(data.token);
      this.http.get('http://localhost:8080/api/user/me', {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      }).pipe(takeUntil(this.subscriptions)).subscribe((data: any) => {
        this.setLoggedInUser(data);
        this.router.navigate(['/dashboard']);
      })
    });
  }

  createUser(user: User) {
    this.http.post('http://localhost:8080/api/user/createUser', user).pipe((takeUntil(this.subscriptions))).subscribe(() => {
    });
  }

  setLoggedInUser(user: User | undefined) {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUser = user;
  }

  getLoggedInUser(): User {
    return JSON.parse(window.localStorage.getItem('loggedInUser') ?? '');
  }

  getToken() {
    return window.localStorage.getItem('token') ?? '';
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }
}
