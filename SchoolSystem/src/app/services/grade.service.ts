import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubjectGrade} from "../models/SubjectGrade";
import {UsersService} from "./users.service";
import {Grade} from "../models/Grade";
import {map, Observable} from "rxjs";
import {Subject} from "../models/Subject";

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
    return this.http.get('http://localhost:8080/api/subjectGrade/getAllGrades/' + this.userService.getLoggedInUser().id?.toString(), {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    }).pipe(map((data: any) => {
      return data;
    }))
  }

  deleteGrade(gradeId: number) {
    return this.http.delete('http://localhost:8080/api/subjectGrade/delete/' + gradeId.toString(), {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  createGrade(grade: SubjectGrade) {
    return this.http.post('http://localhost:8080/api/subjectGrade/createNewGrade', grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  updateGrade(subjectGradeId: number, grade: Grade) {
    return this.http.put('http://localhost:8080/api/subjectGrade/edit/' + subjectGradeId, grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
  }

  calculateAvgGrades(grades: SubjectGrade[], subject:Subject): Grade {
    let sum = 0;
    if (grades.length && grades.length > 0) {
      grades.forEach((grade: SubjectGrade) => {
        sum += grade.grade.grade;
      });
    } else {
      return {id: subject.id, grade: 0};
    }
    return {id: subject.id, grade: sum / grades.length};
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
