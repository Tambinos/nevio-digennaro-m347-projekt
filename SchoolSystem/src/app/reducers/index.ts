import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { subjectReducer } from './subject.reducer'
import { subjectGradeReducer } from './subject.grade.reducer'

export const reducers: ActionReducerMap<AppState> = {
  subjectGrades: subjectGradeReducer,
  subjects: subjectReducer,
};
