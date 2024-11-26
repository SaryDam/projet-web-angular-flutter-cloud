import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FirebaseService} from "../../../service/firebase.service";

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent {
  taskName: string = '';
  taskDescription: string = ''; // Nouveau champ pour la description

  constructor(
    private dialogRef: MatDialogRef<AddTodoDialogComponent>,
    private firebaseService: FirebaseService
  ) {}

  createTask(): void {
    if (this.taskName.trim()) {
      const newTask = {
        title: this.taskName.trim(),
        description: this.taskDescription.trim(), // Ajouter la description
        completed: false,
        timestamp: new Date().toISOString(),
      };
      this.firebaseService.addTodo('todos', newTask).then(() => {
        this.dialogRef.close(); // Fermer la boîte de dialogue
      });
    }
  }
}
