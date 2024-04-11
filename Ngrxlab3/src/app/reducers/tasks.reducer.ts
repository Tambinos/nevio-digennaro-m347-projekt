import {createReducer, on} from "@ngrx/store";
import {addTask, completeTask, notCompleteTask, removeTask} from "../actions/tasks.actions";
import {Task} from "../models/Task";

export const initialTasks: Task[] = []

export const taskReduced = createReducer(
  initialTasks,
  on(addTask, (state, {task}) => [...state, task]),
  on(removeTask, (state, {id}) => state.filter(t => t.id !== id)),
  on(completeTask, (state, {id}) => state.map(t => t.id === id ? {...t, completed: true} : t)),
  on(notCompleteTask, (state, {id}) => state.map(t => t.id === id ? {...t, completed: false} : t))
)
