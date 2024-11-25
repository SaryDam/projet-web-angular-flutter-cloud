import 'package:flutter/material.dart';

class TodoComponent extends StatelessWidget {
  final String title;
  final bool isCompleted;
  final Function() onToggle;
  final Function() onDelete;

  TodoComponent({
    required this.title,
    required this.isCompleted,
    required this.onToggle,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Checkbox(
        value: isCompleted,
        onChanged: (value) => onToggle(),
      ),
      title: Text(
        title,
        style: TextStyle(
          decoration: isCompleted ? TextDecoration.lineThrough : null,
        ),
      ),
      trailing: IconButton(
        icon: Icon(Icons.delete),
        onPressed: onDelete,
      ),
    );
  }
}