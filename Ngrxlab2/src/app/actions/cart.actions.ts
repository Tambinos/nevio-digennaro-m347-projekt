import {createAction, props} from '@ngrx/store';
import {Product} from "../models/Product";

export enum ActionTypes {
  ADD = '[Cart Component] Add',
  REMOVE = '[Cart Component] Remove',
  RESET = '[Cart Component] Reset',
}

export const add = createAction(ActionTypes.ADD, props<{ product: Product }>());
export const remove = createAction(ActionTypes.REMOVE, props<{ index: number }>());
export const reset = createAction(ActionTypes.RESET);
