import { Component, OnInit } from '@angular/core';
import { FirebaseService} from "../../service/firebase.service";
import { Todo} from "../../model/todo.model";
import { Observable } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {AddTodoDialogComponent} from "./add-todo-dialog/add-todo-dialog.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$!: Observable<Todo[]>; // Flux des todos

  constructor(private firebaseService: FirebaseService,
              private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.todos$ = this.firebaseService.getTodos();
  }

  openCreateTodoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTodo: Partial<Todo> = {
          title: result,
          completed: false,
          createdAt: new Date(),
          description: result,
        };
        this.firebaseService.addTodo('todos', newTodo).then(() => {
          console.log('Tâche ajoutée avec succès');
        });
      }
    });
  }
}
