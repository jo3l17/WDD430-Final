import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  todosChanged = new Subject<Todo[]>();
  todos: Todo[] = [];

  constructor(private readonly http: HttpClient) {}

  async getTodos(): Promise<Todo[]> {
    const todos = await this.http
      .get<Todo[]>(environment.SERVER_URL + "/api/todos")
      .toPromise();
    this.todos = todos?.slice() || [];
    this.todosChanged.next(this.todos.slice());
    return todos || [];
  }

  async getTodo(id: string): Promise<Todo | null> {
    const todo = await this.http
      .get<Todo>(environment.SERVER_URL + "/api/todos/" + id)
      .toPromise();
    return todo || null;
  }

  async addTodo(todo: Todo): Promise<Todo | null> {
    const newTodo = await this.http
      .post<Todo>(environment.SERVER_URL + "/api/todos", todo)
      .toPromise();
    if (newTodo) {
      this.todos.push(newTodo);
      this.todosChanged.next(this.todos.slice());
    }
    return newTodo || null;
  }

  async updateTodo(todo: Todo): Promise<Todo | null> {
    const updatedTodo = await this.http
      .put<Todo>(environment.SERVER_URL + "/api/todos/" + todo._id, todo)
      .toPromise();
    if (updatedTodo) {
      const index = this.todos.findIndex((t) => t._id === todo._id);
      this.todos[index] = todo;
      this.todosChanged.next(this.todos.slice());
    }
    return updatedTodo || null;
  }

  async deleteTodo(todo: Todo): Promise<Todo | null> {
    const deletedTodo = await this.http
      .delete<Todo>(environment.SERVER_URL + "/api/todos/" + todo._id)
      .toPromise();
    if (deletedTodo) {
      const index = this.todos.findIndex((t) => t._id === todo._id);
      this.todos.splice(index, 1);
      this.todosChanged.next(this.todos.slice());
    }
    return deletedTodo || null;
  }
}
