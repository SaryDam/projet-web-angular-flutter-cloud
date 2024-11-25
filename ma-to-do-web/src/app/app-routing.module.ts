import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from "./todo/todo.component";

const routes: Routes = [
  { path: 'todo', component: TodoComponent }, // Route pour le TodoComponent
  { path: '', redirectTo: '/todo', pathMatch: 'full' } // Redirige vers
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
