import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { EditTodoComponent } from "./todos/edit-todo/edit-todo.component";
import { TodosComponent } from "./todos/todos.component";
import { LoginComponent } from "./users/login/login.component";
import { SignupComponent } from "./users/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full",
  },
  {
    path: "todos",
    component: TodosComponent,
    children: [
      {
        path: ":id/edit",
        component: EditTodoComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
