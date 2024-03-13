import {Subject} from "./Subject";
import {Grade} from "./Grade";
import {User} from "./User";

export class GradeSubject {
  id: number|undefined;
  grade: Grade;
  date: string|undefined;
  subject: Subject;
  user: User;


  constructor(grade: Grade, subject: Subject, user: User) {
    this.grade = grade;
    this.subject = subject;
    this.user = user;
  }
}
