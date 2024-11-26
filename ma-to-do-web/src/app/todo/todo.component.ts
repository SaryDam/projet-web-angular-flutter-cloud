import { Component, OnInit } from '@angular/core';
import { FirebaseService} from "../../service/firebase.service";
import { Todo} from "../../model/todo.model";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$!: Observable<Todo[]>; // Flux des todos
  newTodoName: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.todos$ = this.firebaseService.getTodos();
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

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.firebaseService.updateTodoStatus('todos', todo.id, todo.completed);
  }
}
