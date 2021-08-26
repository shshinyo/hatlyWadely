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
export class ProfileGuard implements CanActivate {
  constructor(
    private _router: Router,
    private readonly _identityManager: IdentityManager,
    private readonly _modal: ModalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated: boolean = this._identityManager.isAuthenticated;
    const user = isAuthenticated ? new User(this._identityManager.user) : null;

    if (isAuthenticated && (user.isClient || user.isGeneral || user.isBoth)) {
      return true;
    } else {
      this._router.navigateByUrl("/shop/login");
      return false;
    }
  }
}
