import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TodoService } from "src/app/todos/todo.service";
import { Todo } from "../todo.model";

@Component({
  selector: "add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.scss"],
})
export class AddTodoComponent implements OnInit {

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {}

  async onSubmit(f: NgForm) {
    const title = f.value.title;
    const todo = {
      title,
      completed: false,
    };
    await this.todoService.addTodo(todo as Todo);
    f.reset();
  }
}
