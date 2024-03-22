import {createAction, props} from "@ngrx/store";
import { Task } from "../models/Task";

export enum TasksActions {
  ADD_TASK = '[Tasks] Add Task',
  REMOVE_TASK = '[Tasks] Remove Task',
  COMPLETE_TASK = '[Tasks] Complete Task',
}

export const addTask = createAction(TasksActions.ADD_TASK, props<{ task: Task }>());
export const removeTask = createAction(TasksActions.REMOVE_TASK, props<{ id: number }>());
export const completeTask = createAction(TasksActions.COMPLETE_TASK, props<{ id: number }>());
