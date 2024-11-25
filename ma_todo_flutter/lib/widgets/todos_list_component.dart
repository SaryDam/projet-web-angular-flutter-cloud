import 'package:flutter/material.dart';
import '../models/todo.dart';
import 'todo_component.dart';

class TodosList extends StatelessWidget {
  final List<Todo> todos;
  final Function(int) onToggle;
  final Function(int) onDelete;

  TodosList({
    required this.todos,
    required this.onToggle,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: todos.length,
      itemBuilder: (context, index) {
        final todo = todos[index];
        return TodoComponent(
          title: todo.title,
          isCompleted: todo.isCompleted,
          onToggle: () => onToggle(index),
          onDelete: () => onDelete(index),
        );
      },
    );
  }
}