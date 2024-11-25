import { Component } from '@angular/core';
import {FirebaseService} from "../../service/firebase.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor(private firebaseService: FirebaseService) {}

  addDocument() {
    this.firebaseService.addTestDocument();
  }

}
