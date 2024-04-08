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
  loggedInUser: User | undefined;
  private subscriptions: SubjectRxjs<void> = new SubjectRxjs<void>();


  constructor(private http: HttpClient, private router: Router){

  }

  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  login(user: User) {
    this.http.post('http://localhost:8080/api/user/login', user).pipe((takeUntil(this.subscriptions))).subscribe((data: any) => {
     this.setToken(data.token);
      this.http.get('http://localhost:8080/api/user/me', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      })
        .pipe(
          takeUntil(this.subscriptions)
        )
        .subscribe({
          next: (data: any) => {
            this.setLoggedInUser(data);
            if (data) {
              this.router.navigate(['/dashboard'])
            }
          },
          error: (error) => {
            console.error('Error fetching user data:', error);
          }
        })
    })
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
    if (window.localStorage.getItem('loggedInUser')) {
      return JSON.parse(window.localStorage.getItem('loggedInUser') !);
    } else {
      return {username: '', password: ''};
    }
  }

  getToken(){
    return window.localStorage.getItem('token') ?? '';
  }
  setToken(token: string){
    window.localStorage.setItem('token', token);
  }
}
