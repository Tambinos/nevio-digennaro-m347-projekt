import {createAction, props} from "@ngrx/store";
import {SubjectGrade} from "../models/SubjectGrade";
import {Grade} from "../models/Grade";

export enum SubjectGradeActionTypes {
  ADD_SUBJECT_GRADE = '[SubjectGrade] Add Subject Grade',
  REMOVE_SUBJECT_GRADE = '[SubjectGrade] Remove Subject Grade',
  UPDATE_SUBJECT_GRADE = '[SubjectGrade] Update Subject Grade',
  loadSubjectsGrades = '[Subject] Load Subjects',
  loadSubjectsSuccessGrades = '[Subject] Load Subjects Success',
  loadSubjectsFailureGrades = '[Subject] Load Subjects Failure',
}

export const addSubjectGrade = createAction(
  SubjectGradeActionTypes.ADD_SUBJECT_GRADE,
  (subjectGrade: SubjectGrade) => ({subjectGrade})
);
export const removeSubjectGrade = createAction(
  SubjectGradeActionTypes.REMOVE_SUBJECT_GRADE,
  (subjectGrade: SubjectGrade) => ({subjectGrade})
);
export const updateSubjectGrade = createAction(
  SubjectGradeActionTypes.UPDATE_SUBJECT_GRADE,
  (grade: Grade, id: number) => ({grade, id})
);
export const loadSubjectsGrades = createAction(
  SubjectGradeActionTypes.loadSubjectsGrades
);
export const loadSubjectGradesSuccess = createAction(
  SubjectGradeActionTypes.loadSubjectsSuccessGrades,
  props<{ subjectGrades: SubjectGrade[] }>()
);
export const loadSubjectGradesFailure = createAction(
  SubjectGradeActionTypes.loadSubjectsFailureGrades,
  (error: any) => ({error})
);
