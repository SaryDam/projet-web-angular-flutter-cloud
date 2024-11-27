import 'package:flutter/material.dart';
import '../models/todo.dart';
import 'todo_component.dart';

class TodosListComponent extends StatelessWidget {
  final List<Todo> todos;
  final Function(Todo) onToggleComplete;
  final Function(Todo) onDelete;

  TodosListComponent({
    required this.todos,
    required this.onToggleComplete,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: todos.length,
      itemBuilder: (context, index) {
        final todo = todos[index];
        return TodoComponent(
          todo: todo,
          onToggleComplete: () => onToggleComplete(todo),
          onDelete: () => onDelete(todo),
        );
      },
    );
  }
}