import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable, of, takeUntil} from "rxjs";
import {Subject as SubjectRxjs} from "rxjs/internal/Subject";
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
    return of({id: 0, username: 'henrich', password: '123', admin: true});
  }

  getLoggedInUser(): User {
    return JSON.parse(window.localStorage.getItem('user') ?? '') as User;
  }
  setLoggedInUser(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
}
