import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GradeSubject} from "../models/GradeSubject";
import {UsersService} from "./users.service";
import {Grade} from "../models/Grade";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GradeService {


  constructor(protected http: HttpClient, protected userService: UsersService) {
  }


  setFocusedGrade(grade: GradeSubject) {
    window.localStorage.setItem('focusedGrade', JSON.stringify(grade));
  }

  getFocusedGrade(): GradeSubject {
    return JSON.parse(window.localStorage.getItem('focusedGrade') ?? '');
  }

  getGradesOfLoggedInUser() {
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

  createGrade(grade: GradeSubject) {
    this.http.post('http://localhost:8080/api/subjectGrade/createNewGrade', grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
      .subscribe();
  }

  updateGrade(subjectGradeId: number, grade: Grade) {
    this.http.put('http://localhost:8080/api/subjectGrade/edit/' + subjectGradeId, grade, {
      headers: {
        'Authorization': `Bearer ${this.userService.getToken()}`
      }
    })
      .subscribe();
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
