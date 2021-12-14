import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  todosChanged = new Subject<Todo[]>();
  todos: Todo[] = [];
  headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  constructor(private readonly http: HttpClient, private router: Router) {}

  async getTodos(): Promise<Todo[]> {
    try {
      const todos = await this.http
        .get<Todo[]>(environment.SERVER_URL + "/api/todos", {
          headers: this.headers,
        })
        .toPromise();
      this.todos = todos?.slice() || [];
      this.todosChanged.next(this.todos.slice());
      return todos || [];
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return [];
      }
      this.router.navigate(["/"]);
      return [];
    }
  }

  async getTodo(id: string): Promise<Todo | null> {
    try {
      const todo = await this.http
        .get<Todo>(environment.SERVER_URL + "/api/todos/" + id, {
          headers: this.headers,
        })
        .toPromise();
      return todo || null;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
      this.router.navigate(["/"]);
      return null;
    }
  }

  async addTodo(todo: Todo): Promise<Todo | null> {
    try {
      const newTodo = await this.http
        .post<Todo>(environment.SERVER_URL + "/api/todos", todo, {
          headers: this.headers,
        })
        .toPromise();
      if (newTodo) {
        this.todos.push(newTodo);
        this.todosChanged.next(this.todos.slice());
      }
      return newTodo || null;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
      this.router.navigate(["/"]);
      return null;
    }
  }

  async updateTodo(todo: Todo): Promise<Todo | null> {
    try {
      const updatedTodo = await this.http
        .put<Todo>(environment.SERVER_URL + "/api/todos/" + todo._id, todo, {
          headers: this.headers,
        })
        .toPromise();
      if (updatedTodo) {
        const index = this.todos.findIndex((t) => t._id === todo._id);
        this.todos[index] = todo;
        this.todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
        this.todosChanged.next(this.todos.slice());
      }
      return updatedTodo || null;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
      this.router.navigate(["/"]);
      return null;
    }
  }

  async deleteTodo(todo: Todo): Promise<Todo | null> {
    try {
      const deletedTodo = await this.http
        .delete<Todo>(environment.SERVER_URL + "/api/todos/" + todo._id, {
          headers: this.headers,
        })
        .toPromise();
      if (deletedTodo) {
        const index = this.todos.findIndex((t) => t._id === todo._id);
        this.todos.splice(index, 1);
        this.todosChanged.next(this.todos.slice());
      }
      return deletedTodo || null;
    } catch (e) {
      if (e instanceof HttpErrorResponse && e.status === 401) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
        return null;
      }
      this.router.navigate(["/"]);
      return null;
    }
  }
}
