import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TodoService } from "src/app/todos/todo.service";
import { Todo } from "../todo.model";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  subscriber: Subscription;

  constructor(private readonly todoService: TodoService) {
    this.subscriber = todoService.todosChanged.subscribe((todos) => {
      this.todos = todos;
    });
  }

  async ngOnInit(): Promise<void> {
    this.todos = await this.todoService.getTodos();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
