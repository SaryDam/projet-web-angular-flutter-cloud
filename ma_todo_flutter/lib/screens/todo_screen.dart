import 'package:flutter/material.dart';
import 'package:ma_todo_flutter/widgets/todos_list_component.dart';
import '../widgets/input_component.dart';
import '../models/todo.dart';

class TodoScreen extends StatefulWidget {
  @override
  _TodoScreenState createState() => _TodoScreenState();
}

class _TodoScreenState extends State<TodoScreen> {
  List<Todo> todos = [];

  void addTodo(String title) {
    setState(() {
      todos.add(Todo(title: title, isCompleted: false));
    });
  }

  void toggleTodoStatus(int index) {
    setState(() {
      todos[index].isCompleted = !todos[index].isCompleted;
    });
  }

  void deleteTodoAt(int index) {
    setState(() {
      todos.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Todo App')),
      body: Column(
        children: [
          InputComponent(onAdd: addTodo),
          Expanded(
            child: TodosList(
              todos: todos,
              onToggle: toggleTodoStatus,
              onDelete: deleteTodoAt,
            ),
          ),
        ],
      ),
    );
  }
}