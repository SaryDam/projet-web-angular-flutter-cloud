import 'package:flutter/material.dart';
import '../models/todo.dart';

class TodoComponent extends StatelessWidget {
  final Todo todo;
  final VoidCallback onToggleComplete;
  final VoidCallback onDelete;

  TodoComponent({
    required this.todo,
    required this.onToggleComplete,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: todo.completed ? Colors.green.shade100 : null,
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: ListTile(
        leading: Checkbox(
          value: todo.completed,
          onChanged: (_) => onToggleComplete(),
        ),
        title: Text(todo.title),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(todo.description),
            Text(
              todo.createdAt != null
                  ? DateTime.now().difference(todo.createdAt!).inDays == 0
                      ? 'Aujourd\'hui'
                      : '${todo.createdAt}'
                  : 'Pas de date enregistrée',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        trailing: IconButton(
          icon: const Icon(Icons.delete, color: Colors.red),
          onPressed: onDelete,
        ),
      ),
    );
  }
}