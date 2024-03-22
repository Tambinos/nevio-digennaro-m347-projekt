import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {TodoComponent} from "./components/todo/todo.component";
import {CreateTodoComponent} from "./components/create-todo/create-todo.component";

const routes: Routes = [
  {path: '', component: TodoComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'create', component: CreateTodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
