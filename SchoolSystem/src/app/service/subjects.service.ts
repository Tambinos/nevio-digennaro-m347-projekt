import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/Subject";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  subjects: Subject[] = []
  avgGrades: Subject[] = [];


  constructor(private http: HttpClient, private userService: UsersService) {
    this.updateSubjectsAndAVGGrades();
  }

  updateSubjectsAndAVGGrades() {
    this.http.get('http://localhost:8080/api/admin/subject/all').subscribe((data: any) => {
      this.subjects = data;
      this.subjects.sort((a, b) => (a.subject.toUpperCase() > b.subject.toUpperCase()) ? 1 : -1);
      for (let subject of this.subjects) {
        this.http.get('http://localhost:8080/api/subjectGrade/avgGrade/' + this.userService.getLoggedInUser().id?.toString() + '/' + subject.id?.toString()).subscribe((data: any) => {
          if (this.avgGrades.find(s => s.id === subject.id) === undefined) {
            let newSubject = new Subject(data.toString());
            newSubject.id = subject.id;
            this.avgGrades.push(newSubject);
          } else {
            // @ts-ignore
            this.avgGrades.find(s => s.id === subject.id).subject = data;
          }
        })
      }
    })
  }
  getAverageGrade(subjectId: number): number {
    return Number.parseFloat(this.avgGrades.find(s => s.id === subjectId)?.subject ?? "0");
  }

  setFocusedSubject(subject: Subject) {
    window.localStorage.setItem('focusedSubject', JSON.stringify(subject));
  }

  getFocusedSubject(): Subject {
    return JSON.parse(window.localStorage.getItem('focusedSubject') ?? '');
  }

  addSubject(subject: Subject) {
    this.http.post('http://localhost:8080/api/admin/subject/create', subject).subscribe(() => {
      this.updateSubjectsAndAVGGrades();
    });
  }

  editSubject(subject: Subject, newSubject: string) {
    let newSub: Subject = new Subject(newSubject);
    newSub.id = subject.id;
    this.http.put('http://localhost:8080/api/admin/subject/editSubject', newSub).subscribe(() => {
      this.updateSubjectsAndAVGGrades();
    });
  }

  deleteSubject(subject: Subject) {
    this.http.delete('http://localhost:8080/api/admin/subject/delete/' + subject.id).subscribe(() => {
      this.updateSubjectsAndAVGGrades();
    });
  }
}
