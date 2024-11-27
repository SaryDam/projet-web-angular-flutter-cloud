import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FirebaseService} from "../../../service/firebase.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent {
  taskName: string = '';
  taskDescription: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddTodoDialogComponent>,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar
  ) {
  }

  createTask(): void {
    if (this.taskName.trim()) {
      const newTask = {
        title: this.taskName.trim(),
        description: this.taskDescription.trim(),
        completed: false,
        createdAt: new Date(),
      };
      this.firebaseService.addTodo('todos', newTask).then(() => {
        this.dialogRef.close();
        this.snackBar.open('Tâche créée avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'], // Classe CSS optionnelle pour le style
        });
      })
    .catch((error) => {
        console.error('Erreur lors de la création de la tâche :', error);
        this.snackBar.open('Erreur lors de la création de la tâche.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      });
    } else {
      this.snackBar.open('veuillez entrer un titre pour la tache.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }
}
