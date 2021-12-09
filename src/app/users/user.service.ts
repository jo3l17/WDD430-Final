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
  }

  async login(user: User) {
    const token = await this.http
      .post<{ token: string }>(
        environment.SERVER_URL + "/api/users/login",
        user
      )
      .toPromise();
    if (!token) {
      throw new Error("No token received");
    }
    localStorage.setItem("token", token.token);
  }

  isLoggedIn(){
    const token = localStorage.getItem("token");
    if(!token){
      return false;
    }
    return true
    // const user = await this.http
    //   .get<{ user: User }>(environment.SERVER_URL + "/api/users/me", {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .toPromise();
    // if (!user) {
    //   return false;
    // }
    // return true;
  }
}
