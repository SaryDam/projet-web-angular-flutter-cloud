import 'package:cloud_firestore/cloud_firestore.dart';

class Todo {
  final String id;
  final String title;
  final String description;
  final bool completed;
  final DateTime? createdAt;

  Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.completed,
    this.createdAt,
  });

  factory Todo.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Todo(
      id: doc.id,
      title: data['title'] ?? '',
      description: data['description'] ?? '',
      completed: data['completed'] ?? false,
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'description': description,
      'completed': completed,
      'createdAt': createdAt != null
      ? Timestamp.fromDate(createdAt!)
      : FieldValue.serverTimestamp(),
    };
  }
}