import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user?: User;
  errorMessage = "";
  constructor(private readonly userService:UserService,private readonly router:Router) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigate(["/todos"])
    }
  }

  async onSubmit(form: NgForm) {
    const values = form.value;
    const user = { email: values.email, password: values.password } as User;
    try {
      await this.userService.login(user);
      this.router.navigate(["/todos"])
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
      this.errorMessage = e.error.message;
    }
    }
  }
}
