import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  user?: User;
  confirmPassword: string = "";
  passwordMatch = true;
  errorMessage = "";

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    const values = form.value;
    if (values.password !== this.confirmPassword) {
      this.passwordMatch = false;
      return;
    }
    const user = { email: values.email, password: values.password } as User;
    try {
      await this.userService.signup(user);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.log(e.error);
        this.errorMessage = e.error.message;
      }
    }
  }
}
