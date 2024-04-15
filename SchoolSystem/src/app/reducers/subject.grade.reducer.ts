import {createReducer, on} from '@ngrx/store';
import {
  addSubjectGrade,
  loadSubjectGradesSuccess,
  removeSubjectGrade,
  updateSubjectGrade
} from '../actions/SubjectGrade.action';
import {SubjectGrade} from "../models/SubjectGrade";

export const initialState: SubjectGrade[] = []

export const subjectGradeReducer = createReducer(
  initialState,
  on(loadSubjectGradesSuccess, (state, {subjectGrades}) => {
    if (subjectGrades === undefined) return state;
    return subjectGrades;
  }),
  on(addSubjectGrade, (state, {subjectGrade}) => [...state, subjectGrade]),
  on(removeSubjectGrade, (state, {subjectGrade}) => state.filter(sg => sg.id !== subjectGrade.id)),
  on(updateSubjectGrade, (state, {grade, id}) => state.map(sg => sg.id === id ? {...sg, grade: grade} : sg))
);
