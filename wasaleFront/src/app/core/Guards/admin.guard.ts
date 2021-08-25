import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.isAdmin();
    return
  }

  // isAdmin() {
  //   if (this.authService.isLoggedIn) {
  //     const user = window.localStorage.getItem("user");
  //     const x = JSON.parse(user);
  //     if (x.role === 1) {
  //       return true;
  //     }
  //   }
  //   this.router.navigateByUrl("notfound");
  //   return false;
  // }
}
