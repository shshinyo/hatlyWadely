import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { newUser } from "../../shared/utilities/authUser";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }

  isAdmin() {
    if (this.authService.isLoggedIn) {
      const user = window.localStorage.getItem("user");
      const x: newUser = JSON.parse(user);
      if (x.role === 1) {
        return true;
      }
    }
    this.router.navigateByUrl("notfound");
    return false;
  }
}
