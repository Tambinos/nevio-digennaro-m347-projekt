import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/Subject";
import {UsersService} from "./users.service";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(private http: HttpClient, private userService: UsersService) {
  };

  public subjectsArray: Subject[] = [
    {id: 0, subject: 'Math'},
    {id: 1, subject: 'Science'},
    {id: 2, subject: 'History'}
  ];

  public averageGrades: number[][] = [[5], [4], [6]]


  getSubjects(): Observable<Subject[]> {
    return of(this.subjectsArray)
  }

  getAverageGrade(subjectId: number): Observable<number> {
    let sum: number = 0;
    this.averageGrades[subjectId].forEach(number => sum += number)
    return of(sum / this.averageGrades[subjectId].length)
  }

  addSubject(subject: Subject): Observable<Object> {
    alert('Subject was added')

    /*subject.id = this.subjectsArray.length
    this.subjectsArray.push(subject)

     */
    return of(this.subjectsArray)
  }

  editSubject(subject: Subject, newSubject: string): Observable<Object> {
    alert('Subject was edited')
    // this.subjectsArray[subject.id!].subject = newSubject
    return of(this.subjectsArray)
  }

  deleteSubject(subject: Subject): Observable<Object> {
    alert("Subject was deleted")
    /* this.subjectsArray = this.subjectsArray.filter(subject2 => subject2.id !== subject.id!)
     let newSubjectsArray: Subject[] = [];
     for (let i = 0; i < this.subjectsArray.length; i++) {
       let newSubject: Subject = { ...this.subjectsArray[i], id: i }; // Create a new object
       newSubjectsArray.push(newSubject);
     }
     this.averageGrades = this.averageGrades.splice(0, subject.id)
     this.averageGrades.push(...this.averageGrades.splice(subject.id!, this.averageGrades.length))
     this.subjectsArray = newSubjectsArray;

     */
    return of(this.subjectsArray)
  }

  setFocusedSubject(subject: Subject) {
    window.localStorage.setItem('focusedSubject', JSON.stringify(subject));
  }

  getFocusedSubject(): Subject {
    return JSON.parse(window.localStorage.getItem('focusedSubject') ?? '');
  }

}
