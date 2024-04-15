import { SubjectsState } from './subject.state';
import { SubjectGradesState } from './subject.grades.state'

export interface AppState {
  subjectGrades: SubjectGradesState;
  subjects: SubjectsState;
}
