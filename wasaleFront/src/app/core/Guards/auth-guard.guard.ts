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
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.checkLoggedIn(state.url);
    return
  }

  // checkLoggedIn(url: string) {
  //   if (this.authService.isLoggedIn) {
  //     return true;
  //   }
  //   this.authService.redirectUrl = url;
  //   this.router.navigate(["/user/login"]);
  //   return false;
  // }
}
