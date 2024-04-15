import {Subject} from "../models/Subject";
import {createReducer, on} from "@ngrx/store";
import {addSubject, loadSubjectsSuccess, removeSubject, updateSubject} from "../actions/Subject.action";

export const initialState: Subject[] = [];
export const subjectReducer = createReducer(
  initialState,
  on(loadSubjectsSuccess, (state, {subjects}) => {
    if (subjects === undefined) return state;
    return [...subjects]
  }),
  on(addSubject, (state, {subject}) => [...state, subject]),
  on(removeSubject, (state, {subject}) => state.filter(s => s.id !== subject.id)),
  on(updateSubject, (state, {subject}) => state.map(s => s.id === subject.id ? subject : s))
);



