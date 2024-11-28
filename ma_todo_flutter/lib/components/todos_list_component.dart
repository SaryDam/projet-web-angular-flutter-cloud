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

  Future<bool> _confirmDelete(BuildContext context) async {
    final shouldDelete = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirmation'),
          content: const Text('Êtes-vous sûr de vouloir supprimer cette tâche ?'),
          actions: [
            TextButton(
              child: const Text('Annuler'),
              onPressed: () => Navigator.of(context).pop(false),
            ),
            TextButton(
              child: const Text('Supprimer'),
              onPressed: () => Navigator.of(context).pop(true),
            ),
          ],
        );
      },
    );

    return shouldDelete ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: todos.length,
      itemBuilder: (context, index) {
        final todo = todos[index];
        return Dismissible(
          key: Key(todo.id),
          direction: DismissDirection.endToStart,
          confirmDismiss: (direction) async {
            return await _confirmDelete(context);
          },
          onDismissed: (direction) {
            onDelete(todo);
          },
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.only(right: 16),
            child: const Icon(Icons.delete, color: Colors.white),
          ),
          child: TodoComponent(
            todo: todo,
            onToggleComplete: () => onToggleComplete(todo),
            onDelete: () => onDelete(todo),
          ),
        );
      },
    );
  }
}