import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubjectGrade} from "../models/SubjectGrade";
import {UsersService} from "./users.service";
import {Grade} from "../models/Grade";
import {Observable, switchMap} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class GradeService {


  constructor(private http: HttpClient, private userService: UsersService) {
  }


  setFocusedGrade(grade: SubjectGrade) {
    window.localStorage.setItem('focusedGrade', JSON.stringify(grade));
  }

  getFocusedGrade(): SubjectGrade {
    return JSON.parse(window.localStorage.getItem('focusedGrade') ?? '');
  }

  getGradesOfLoggedInUser(): Observable<SubjectGrade[]> {
    return this.userService.getMe().pipe(
      switchMap((user: User) => {
        return this.http.get<SubjectGrade[]>(`http://localhost:8080/api/subjectGrade/getAllGrades/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${this.userService.getToken()}`
          }
        });
      })
    );
  }

  deleteGrade(gradeId: number): Observable<Object> {
    return this.http.delete('http://localhost:8080/api/subjectGrade/delete/' + gradeId.toString(), {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  createGrade(grade: SubjectGrade): Observable<Object> {
    return this.http.post('http://localhost:8080/api/subjectGrade/createNewGrade', grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  updateGrade(subjectGradeId: number, grade: Grade): Observable<Object> {
    return this.http.put('http://localhost:8080/api/subjectGrade/edit/' + subjectGradeId, grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  getGradeRatingColor(grade: number): string {
    if (grade >= 4.5) {
      return '#90ff90';
    } else if (grade >= 3.5) {
      return '#e8f178';
    } else {
      return '#ff6666';
    }
  }
}
