import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

import { ModalService } from "src/app/core/services/modal.service";
import { IdentityManager } from "../identity-manager.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router,
    private readonly _identityManager: IdentityManager,
    private readonly _modal: ModalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: User = this._identityManager.user;
    if (user) {
      this._router
        .navigateByUrl(
          // handel dashboard route here
          user.isClient || user.isGeneral || user.isBoth ? "/shop" : "/shop"
        )
        .then(() => {
          this._modal.snackbar("انت مسجل الدخول بالفعل..");
        });
      return false;
    }

    return true;
  }
}
