import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/Subject";
import {UsersService} from "./users.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(private http: HttpClient, private userService: UsersService) {
  };

  getSubjects(): Observable<Subject[]> {
    return this.http.get('http://localhost:8080/api/admin/subject/all', {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    }).pipe(map((data: any) => {
      return data;
    }))
  }

  getAverageGrade(subjectId: number): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/subjectGrade/avgGrade/' + this.userService.getLoggedInUser().id?.toString() + '/' + subjectId.toString(), {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    }).pipe(map((data: any) => {
      return data;
    }))
  }

  addSubject(subject: Subject): Observable<Object> {
    return this.http.post('http://localhost:8080/api/admin/subject/create', subject, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  editSubject(subject: Subject, newSubject: string): Observable<Object> {
    let newSub: Subject = {id: subject.id, subject: newSubject};
    newSub.id = subject.id;
    return this.http.put('http://localhost:8080/api/admin/subject/editSubject', newSub, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  deleteSubject(subject: Subject): Observable<Object> {
    return this.http.delete('http://localhost:8080/api/admin/subject/delete/' + subject.id, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  setFocusedSubject(subject: Subject) {
    window.localStorage.setItem('focusedSubject', JSON.stringify(subject));
  }

  getFocusedSubject(): Subject {
    return JSON.parse(window.localStorage.getItem('focusedSubject') ?? '');
  }

}
