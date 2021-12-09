import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
// import * as jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
