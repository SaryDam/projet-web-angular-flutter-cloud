import 'package:flutter/material.dart';

class InputComponent extends StatelessWidget {
  final TextEditingController titleController;
  final TextEditingController descriptionController;
  final VoidCallback onAddTodo;

  InputComponent({
    required this.titleController,
    required this.descriptionController,
    required this.onAddTodo,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: titleController,
          decoration: const InputDecoration(
            labelText: 'Nom de la tâche',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: descriptionController,
          decoration: const InputDecoration(
            labelText: 'Description',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 8),
        ElevatedButton(
          onPressed: onAddTodo,
          child: const Text('Ajouter une tâche'),
        ),
      ],
    );
  }
}