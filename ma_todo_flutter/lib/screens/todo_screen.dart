import 'package:flutter/material.dart';
import 'package:ma_todo_flutter/components/input_component.dart';
import 'package:ma_todo_flutter/components/todos_list_component.dart';
import '../services/todo_service.dart';
import '../models/todo.dart';

class TodoScreen extends StatefulWidget {
  @override
  _TodoScreenState createState() => _TodoScreenState();
}

class _TodoScreenState extends State<TodoScreen> {
  final TodoService _todoService = TodoService();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  void _addTodo() async {
    final todoTitle = _titleController.text.trim();
    final todoDescription = _descriptionController.text.trim();

    if (todoTitle.isNotEmpty) {
      final newTodo = Todo(
        id: '',
        title: todoTitle,
        description: todoDescription,
        completed: false,
        createdAt: DateTime.now(),
      );

      try {
        await _todoService.addTodo(newTodo);
        _titleController.clear();
        _descriptionController.clear();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Tâche ajoutée : $todoTitle')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Échec de l\'ajout de la tâche : $e')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Veuillez entrer un titre pour la tâche.')),
      );
    }
  }

  Future<void> _confirmDelete(Todo todo) async {
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

    if (shouldDelete == true) {
      _deleteTodo(todo.id);
    }
  }

  void _deleteTodo(String id) async {
    try {
      await _todoService.deleteTodo(id);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Tâche supprimée.')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Échec de la suppression de la tâche : $e')),
      );
    }
  }

  void _toggleTodoCompletion(Todo todo) async {
    try {
      await _todoService.updateTodo(todo.id, {'completed': !todo.completed});
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Échec de la mise à jour de la tâche : $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Liste des tâches'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: InputComponent(
              titleController: _titleController,
              descriptionController: _descriptionController,
              onAddTodo: _addTodo,
            ),
          ),
          Expanded(
            child: StreamBuilder<List<Todo>>(
              stream: _todoService.getTodosStream(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(
                      child: Text(
                          'Une erreur est survenue : ${snapshot.error}'));
                }

                final todos = snapshot.data ?? [];
                if (todos.isEmpty) {
                  return const Center(child: Text('Aucune tâche disponible.'));
                }

                return TodosListComponent(
                  todos: todos,
                  onToggleComplete: _toggleTodoCompletion,
                  onDelete: _confirmDelete,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}