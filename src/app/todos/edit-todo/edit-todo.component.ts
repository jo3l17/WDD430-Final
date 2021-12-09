import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "src/app/todos/todo.service";
import { Todo } from "../todo.model";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.component.html",
  styleUrls: ["./edit-todo.component.scss"],
})
export class EditTodoComponent implements OnInit {
  todo!: Todo | null;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly todoService: TodoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      const todo = await this.todoService.getTodo(params["id"]);
      if (!todo) {
        this.router.navigate(["/todos"]);
      }else{
        this.todo = JSON.parse(JSON.stringify(todo));
      }
    });
  }

  onSubmit(f:NgForm){
    this.todo!.title = f.value.title;
    this.todoService.updateTodo(this.todo!);
    this.router.navigate(["/todos"]);
  }
}
