import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {Observable, takeUntil} from "rxjs";
import {Subject as SubjectRxjs} from "rxjs/internal/Subject";
import {loadSubjects} from "../actions/Subject.action";
import {loadSubjectsGrades} from "../actions/SubjectGrade.action";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private subscriptions: SubjectRxjs<void> = new SubjectRxjs<void>();
firstInitiated: boolean = true;

  constructor(private http: HttpClient, private store: Store) {

  }

  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  login(user: User) {
    return this.http.post('http://localhost:8080/api/user/login', user);
  }

  createUser(user: User) {
    return this.http.post('http://localhost:8080/api/user/createUser', user).pipe((takeUntil(this.subscriptions)));
  }

  getMe(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/api/user/me',{
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }
  getLoggedInUser(): User {
    return JSON.parse(window.localStorage.getItem('user') ?? '') as User;
  }
  setLoggedInUser(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string {
    return window.localStorage.getItem('token') ?? '';
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }
}
