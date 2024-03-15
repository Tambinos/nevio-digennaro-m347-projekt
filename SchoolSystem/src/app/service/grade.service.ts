import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GradeSubject} from "../entity/GradeSubject";
import {UsersService} from "./users.service";
import {SubjectsService} from "./subjects.service";
import {Grade} from "../entity/Grade";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  allGradesOfLoggedInUser:GradeSubject[] = [];
  constructor(protected http: HttpClient, protected userService: UsersService,protected subjectService:SubjectsService) {
    this.getGradesOfLoggedInUser();
  }

  getGradesOfLoggedInUser() {
    this.http.get('http://localhost:8080/api/subjectGrade/getAllGrades/' + this.userService.getLoggedInUser().id?.toString()).subscribe((data: any) => {
      this.allGradesOfLoggedInUser = data;
      this.subjectService.updateSubjectsAndAVGGrades();
    })
  }
  getGradesOfSubject(subjectId: number): GradeSubject[] {
    return this.allGradesOfLoggedInUser.filter(g => g.subject.id === subjectId);
  }
  deleteGrade(gradeId: number) {
    this.http.delete('http://localhost:8080/api/subjectGrade/delete/' + gradeId.toString()).subscribe(() => {
      this.getGradesOfLoggedInUser();
    });
  }

  createGrade(grade: GradeSubject) {
    this.http.post('http://localhost:8080/api/subjectGrade/createNewGrade', grade).subscribe((data: any) => {
      this.getGradesOfLoggedInUser();
    });
  }
  updateGrade(grade: Grade , gradeId:number) {
    this.http.put('http://localhost:8080/api/subjectGrade/edit/'+gradeId, grade).subscribe((data: any) => {
      this.getGradesOfLoggedInUser();
    });
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
