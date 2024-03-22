import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Task} from "../../models/Task";
import {completeTask, removeTask} from "../../actions/tasks.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: Observable<Task[]>;

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks = this.store.select('tasks');
  }

  completeTask(id: number) {
    this.tasks.subscribe(tasks => console.log(tasks));
    this.store.dispatch(completeTask({id}));
  }

  removeTask(id: number) {
    this.store.dispatch(removeTask({id}));
  }
}
