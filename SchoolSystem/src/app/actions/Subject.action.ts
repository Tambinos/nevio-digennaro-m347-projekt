import {Subject} from "../models/Subject";
import {createAction, props} from "@ngrx/store";

export enum SubjectActionTypes {
  ADD_SUBJECT = '[Subject] Add Subject',
  REMOVE_SUBJECT = '[Subject] Remove Subject',
  UPDATE_SUBJECT = '[Subject] Update Subject',
  loadSubjects = '[Subject] Load Subjects',
  loadSubjectsSuccess = '[Subject] Load Subjects Success',
  loadSubjectsFailure = '[Subject] Load Subjects Failure',
}

export const addSubject = createAction(
  SubjectActionTypes.ADD_SUBJECT,
  (subject: Subject) => ({subject})
);
export const removeSubject = createAction(
  SubjectActionTypes.REMOVE_SUBJECT,
  (subject: Subject) => ({subject})
);
export const updateSubject = createAction(
  SubjectActionTypes.UPDATE_SUBJECT,
  (subject: Subject) => ({subject})
);
export const loadSubjects = createAction(
  SubjectActionTypes.loadSubjects
);
export const loadSubjectsSuccess = createAction(
  SubjectActionTypes.loadSubjectsSuccess,
  props<{ subjects: Subject[] }>()
);
export const loadSubjectsFailure = createAction(
  SubjectActionTypes.loadSubjectsFailure,
  props<{ error: any }>()
);
