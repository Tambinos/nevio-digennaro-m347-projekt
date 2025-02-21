import {createReducer, on} from '@ngrx/store';
import {SubjectGradesState} from "../state/subject.grades.state";
import {
  addSubjectGrade,
  loadSubjectGradesSuccess,
  removeSubjectGrade,
  updateSubjectGrade
} from "../actions/SubjectGrade.action";

export const initialState: SubjectGradesState = {
  subjectGrades: []
}

export const subjectGradeReducer = createReducer(
  initialState,
  on(loadSubjectGradesSuccess, (state, { subjectGrades }) => {
    if (subjectGrades === undefined) return state;
    return { ...state, subjectGrades: subjectGrades };
  }),
  on(addSubjectGrade, (state, { subjectGrade }) => ({
    ...state,
    subjectGrades: [...state.subjectGrades, subjectGrade]
  })),
  on(removeSubjectGrade, (state, { subjectGrade }) => ({
    ...state,
    subjectGrades: state.subjectGrades.filter(sg => sg.id !== subjectGrade.id)
  })),
  on(updateSubjectGrade, (state, { grade,id }) => ({
    ...state,
    subjectGrades: state.subjectGrades.map(sg =>
      sg.id === id ? {...sg, grade: grade} : sg
    )  }))
);

