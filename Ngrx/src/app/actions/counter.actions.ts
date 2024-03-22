import {createAction, createFeatureSelector, createSelector} from '@ngrx/store';
export enum ActionTypes {
  INCREMENT = '[Counter Component] Increment',
  DECREMENT = '[Counter Component] Decrement',
  RESET = '[Counter Component] Reset',
  GET_COUNTER = '[Counter Component] Get Counter',
}
export const increment = createAction(ActionTypes.INCREMENT);
export const decrement = createAction(ActionTypes.DECREMENT);
export const reset = createAction(ActionTypes.RESET);

