import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubjectGrade} from "../models/SubjectGrade";
import {UsersService} from "./users.service";
import {Grade} from "../models/Grade";
import {Observable, of, switchMap} from "rxjs";
import {User} from "../models/User";
import {SubjectsService} from "./subjects.service";
import {Subject} from "../models/Subject";

@Injectable({
  providedIn: 'root'
})
export class GradeService {


  constructor(private http: HttpClient, private userService: UsersService, private subjectService: SubjectsService) {
  }

  public subjectGradeArray: SubjectGrade[] = [
    {id: 0, grade: {id: 0, grade: 5}, date: "19.9.2024", subject: this.subjectService.subjectsArray[0]},
    {id: 1, grade: {id: 1, grade: 4}, date: "20.9.2024", subject: this.subjectService.subjectsArray[1]},
    {id: 2, grade: {id: 2, grade: 6}, date: "21.9.2024", subject: this.subjectService.subjectsArray[2]},
  ];


  setFocusedGrade(grade: SubjectGrade) {
    window.localStorage.setItem('focusedGrade', JSON.stringify(grade));
  }

  getFocusedGrade(): SubjectGrade {
    return JSON.parse(window.localStorage.getItem('focusedGrade') ?? '');
  }

  getGradesOfLoggedInUser(): Observable<SubjectGrade[]> {
    return of(this.subjectGradeArray)
  }

  addGrade(subjectGrade: SubjectGrade): Observable<Object> {
    alert("Grade was added")
    /*
        subjectGrade.id = this.subjectGradeArray.length
        this.subjectGradeArray.push(subjectGrade)
        this.subjectService.averageGrades[subjectGrade.subject.id!].push(subjectGrade.grade.grade)

     */
    return of(this.subjectGradeArray)
  }

  editGrade(subjectGrade: SubjectGrade, grade: number): Observable<Object> {
    alert("Grade was edited")

    /*this.subjectGradeArray[subjectGrade.id!].grade.grade = grade
    this.subjectService.averageGrades[subjectGrade.subject.id!][subjectGrade.id!] = grade;

     */
    return of(this.subjectGradeArray)
  }

  deleteGrade(subjectGrade: SubjectGrade): Observable<Object> {
    alert("Grade was deleted")
    /*    this.subjectGradeArray = this.subjectGradeArray.filter(subjectGrade2 => subjectGrade2.id !== subjectGrade.id!)
        for (let i = 0; i < this.subjectGradeArray.length; i++) {
          this.subjectGradeArray[i].id = i
        }

     */
    return of(this.subjectGradeArray)
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
