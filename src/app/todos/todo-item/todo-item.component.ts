import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faCheck, faCheckCircle, faEdit, faRedo, faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "bootstrap";
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
  faTrash = faTrash;
  faCheck = faCheckCircle;
  faUndo = faUndo;
  doneTitle  = "Mark as undone";
  disabled = false; // variable to disable while is loading the database change
  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.todo.completed ? this.doneTitle = "Mark as undone" : this.doneTitle = "Mark as done";
    Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode))
  }

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

  async done(){
    this.disabled = true;
    this.todo.completed = !this.todo.completed;
    await this.todoService.updateTodo(this.todo);
    this.disabled = false;
    this.doneTitle = this.todo.completed ? "Mark as undone" : "Mark as done";
  }

  async onChange(event: any) {
    this.disabled = true;
    this.todo.title = event.newValue;
    await this.todoService.updateTodo(this.todo);
    this.disabled = false;
  }
}
