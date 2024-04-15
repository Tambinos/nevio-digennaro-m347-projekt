import {createReducer, on} from "@ngrx/store";
import {addSubject, loadSubjectsSuccess, removeSubject, updateSubject} from "../actions/Subject.action";
import {SubjectsState} from "../state/subject.state";

export const initialState: SubjectsState = {
  subjects: []
};
export const subjectReducer = createReducer(
  initialState,
  on(loadSubjectsSuccess, (state, { subjects }) => {
    if (subjects === undefined) return state;
    return subjects ? { ...state, subjects } : state;
  }),
  on(addSubject, (state, { subject }) => ({
    ...state,
    subjects: [...state.subjects, subject]
  })),
  on(removeSubject, (state, { subject }) => ({
    ...state,
    subjects: state.subjects.filter(s => s.id !== subject.id)
  })),
  on(updateSubject, (state, { subject }) => ({
    ...state,
    subjects: state.subjects.map(s => s.id === subject.id ? { ...s, ...subject } : s)
  }))
);



