import {Subject} from "./Subject";
import {Grade} from "./Grade";
import {User} from "./User";

export interface SubjectGrade {
  id?: number;
  grade: Grade;
  date?: string;
  subject: Subject;
}
