import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/todo.dart';

class TodoService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Stream<List<Todo>> getTodosStream() {
    return _firestore
        .collection('todos')
        .orderBy('createdAt', descending: false)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => Todo.fromFirestore(doc)).toList();
    });
  }

  Future<void> addTodo(Todo todo) async {
    final docRef = _firestore.collection('todos').doc();
    await docRef.set(todo.toMap()..['id'] = docRef.id);
  }

  Future<void> deleteTodo(String id) async {
    await _firestore.collection('todos').doc(id).delete();
  }

  Future<void> updateTodo(String id, Map<String, dynamic> changes) async {
  await _firestore.collection('todos').doc(id).update(changes);
}
}