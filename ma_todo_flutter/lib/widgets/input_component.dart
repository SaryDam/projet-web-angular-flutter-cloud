import 'package:flutter/material.dart';

class InputComponent extends StatelessWidget {
  final Function(String) onAdd;

  InputComponent({required this.onAdd});

  @override
  Widget build(BuildContext context) {
    final TextEditingController controller = TextEditingController();

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: controller,
              decoration: InputDecoration(labelText: 'Ajouter une tâche'),
            ),
          ),
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              if (controller.text.isNotEmpty) {
                onAdd(controller.text);
                controller.clear();
              }
            },
          ),
        ],
      ),
    );
  }
}