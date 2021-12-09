import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TodoService } from "src/app/todos/todo.service";
import { Todo } from "../todo.model";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {
    todoService.todosChanged.subscribe((todos) => {
      this.todos = todos;
    });
  }

  async ngOnInit(): Promise<void> {
    this.todos = await this.todoService.getTodos();
  }

  ngOnDestroy(): void {
    this.todoService.todosChanged.unsubscribe();
  }
}
