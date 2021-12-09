import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  async signup(user: User) {
    const token = await this.http
      .post<{ token: string }>(
        environment.SERVER_URL + "/api/users/signup",
        user
      )
      .toPromise();
    if (!token) {
      throw new Error("No token received");
    }
    localStorage.setItem("token", token.token);
    this.router.navigate(["/todos"]);
    console.log(token);
  }
}
