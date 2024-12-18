import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../../service/firebase.service";
import {Observable} from "rxjs";
import {Todo} from "../../../model/todo.model";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{

  todos$!: Observable<Todo[]>;

  constructor(private firebaseService: FirebaseService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.todos$ = this.firebaseService.getTodos();
    console.log(this.todos$)
  }

  confirmDelete(todoId: string | undefined): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette tâche ?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firebaseService.deleteTodo(todoId).then(() => {
          console.log('Tâche supprimée.');
          this.snackBar.open('tâche supprimée.', 'Fermer', {
            duration: 3000,
          });
        });
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.firebaseService.updateTodo(todo.id, { completed: !todo.completed });
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.firebaseService.updateTodoStatus('todos', todo.id, todo.completed);
  }


}
