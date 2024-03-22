import {Subject} from "./Subject";
import {Grade} from "./Grade";
import {User} from "./User";

export interface GradeSubject {
  id: number|undefined;
  grade: Grade;
  date: string|undefined;
  subject: Subject;
  user: User;
}
