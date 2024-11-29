import {Component} from '@angular/core';
import {FirebaseService} from "../../service/firebase.service";
import {Todo} from "../../model/todo.model";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoDialogComponent} from "./add-todo-dialog/add-todo-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor(private firebaseService: FirebaseService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
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
          this.snackBar.open('Tâche créée avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }
}
