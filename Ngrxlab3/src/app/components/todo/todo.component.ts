import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Task} from "../../models/Task";
import {completeTask, notCompleteTask, removeTask} from "../../actions/tasks.actions";
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

  completeTask(task: Task) {
    const id :number = task.id
    if (task.completed) {
      this.store.dispatch(notCompleteTask({id}));
    }else {
      this.store.dispatch(completeTask({id}));
    }
  }

  removeTask(id: number) {
    this.store.dispatch(removeTask({id}));
  }
}
