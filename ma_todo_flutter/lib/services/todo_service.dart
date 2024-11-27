import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/todo.dart';

class TodoService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Écoute les todos en temps réel
  Stream<List<Todo>> getTodosStream() {
    return _firestore.collection('todos').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Todo.fromFirestore(doc)).toList();
    });
  }

  /// Ajoute un todo
  Future<void> addTodo(Todo todo) async {
    final docRef = _firestore.collection('todos').doc(); // Génère un ID unique
    await docRef.set(todo.toMap()..['id'] = docRef.id);
  }

  /// Supprime un todo
  Future<void> deleteTodo(String id) async {
    await _firestore.collection('todos').doc(id).delete();
  }

  Future<void> updateTodo(String id, Map<String, dynamic> changes) async {
  await _firestore.collection('todos').doc(id).update(changes);
}
}