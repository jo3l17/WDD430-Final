import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faEdit, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { TodoService } from "src/app/todos/todo.service";
import { Todo } from "../todo.model";

@Component({
  selector: "todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  faEdit = faEdit;
  faMinusCircle = faMinusCircle;
  disabled = false; // variable to disable while is loading the database change
  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  async complete(event: any) {
    this.todo.completed = event.target.checked;
    this.disabled = true;
    await this.todoService.updateTodo(this.todo);
    this.disabled = false;
  }

  async deleteTodo() {
    this.disabled = true;
    await this.todoService.deleteTodo(this.todo);
    this.router.navigateByUrl("/todos")
    this.disabled = false;
  }
}
