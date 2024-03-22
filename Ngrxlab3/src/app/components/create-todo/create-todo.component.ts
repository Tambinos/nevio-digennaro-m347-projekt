import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Task} from 'src/app/models/Task';
import {addTask} from "../../actions/tasks.actions";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  textField = new FormControl('');

  constructor(private store: Store<{ tasks: Task[] }>, protected router: Router) {
  }

  addTask(task: string) {
    this.store.dispatch(addTask({task: {id: Math.random(), name: task, completed: false}}));
  }
}
