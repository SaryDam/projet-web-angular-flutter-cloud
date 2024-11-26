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
  newTodoName: string = '';

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
          timestamp: new Date().toISOString(),
          description: result,
        };
        this.firebaseService.addTodo('todos', newTodo).then(() => {
          console.log('Tâche ajoutée avec succès');
        });
      }
    });
  }

  addTodo(): void {
    if (this.newTodoName.trim()) {
      const newTodo: Partial<Todo> = {
        title: this.newTodoName.trim(),
        completed: false,
        timestamp: new Date().toISOString(),
      };

      this.firebaseService.addTodo('todos', newTodo).then(() => {
        this.newTodoName = ''; // Réinitialise le champ d'entrée
        console.log('Nouveau todo ajouté avec succès');
      }).catch((error) => {
        console.error('Erreur lors de l\'ajout du todo :', error);
      });
    }
  }

  updateTodo(todo: Todo): void {
    this.firebaseService.updateTodo(todo.id, { completed: !todo.completed });
  }

  deleteTodo(todoId: string | undefined): void {
    this.firebaseService.deleteTodo(todoId);
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
        });
      }
    });
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.firebaseService.updateTodoStatus('todos', todo.id, todo.completed);
  }
}
