import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {ActionTypes, decrement, increment, reset} from "../../actions/counter.actions";
import {TypedAction} from "@ngrx/store/src/models";

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent implements OnInit{
  counter$: Observable<number> = new Observable<number>();

  constructor(private store: Store<{ counter: number }>) {
    this.counter$ = this.store.select('counter');
  }
  ngOnInit() {

  }
  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
