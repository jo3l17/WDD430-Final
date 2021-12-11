import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Dropdown } from "bootstrap";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((foo) => {
      if (foo instanceof NavigationEnd) {
        this.isLoggedIn = localStorage.getItem("token") ? true : false;
      }
    });
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
