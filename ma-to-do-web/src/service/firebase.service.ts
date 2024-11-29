import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  setDoc,
  updateDoc, query, orderBy,
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  /**
   * Récupère une liste de todos depuis une collection Firestore
   * @param collectionName - Nom de la collection
   * @returns Observable<Todo[]>
   */
  getTodos(collectionName: string = 'todos'): Observable<Todo[]> {
    const todosCollection = collection(this.firestore, collectionName) as CollectionReference<DocumentData>;
    const orderedQuery = query(todosCollection, orderBy('createdAt', 'asc'));
    return collectionData(orderedQuery, { idField: 'id' }).pipe(
      map((todos: DocumentData[]) =>
        todos.map((todo: any) => ({
          ...todo,
          createdAt: todo.createdAt?.toDate ? todo.createdAt.toDate() : todo.createdAt,
        }))
      )
    ) as Observable<Todo[]>;  }

  /**
   * Ajoute un todo à une collection Firestore
   * @param collectionName - Nom de la collection
   * @param todo - Todo à ajouter
   */
  async addTodo(collectionName: string = 'todos', todo: Partial<Todo>): Promise<void> {
    const colRef = collection(this.firestore, collectionName);
    const docRef = doc(colRef);
    await setDoc(docRef, { ...todo, id: docRef.id });
  }

  /**
   * Met à jour un todo dans Firestore
   * @param todoId - ID du todo
   * @param changes - Modifications à appliquer
   */
  async updateTodo(todoId: string | undefined, changes: Partial<Todo>): Promise<void> {
    if (!todoId) throw new Error('Todo ID is required');
    const todoRef = doc(this.firestore, `todos/${todoId}`);
    await updateDoc(todoRef, changes);
  }

  /**
   * Supprime un todo de Firestore
   * @param todoId - ID du todo
   */
  async deleteTodo(todoId: string | undefined): Promise<void> {
    if (!todoId) throw new Error('Todo ID is required');
    const todoRef = doc(this.firestore, `todos/${todoId}`);
    await deleteDoc(todoRef);
  }

  updateTodoStatus(collectionName: string, todoId: string | undefined, completed: boolean): Promise<void> {
    const todoDocRef = doc(this.firestore, `${collectionName}/${todoId}`);
    return updateDoc(todoDocRef, { completed });
  }
}
