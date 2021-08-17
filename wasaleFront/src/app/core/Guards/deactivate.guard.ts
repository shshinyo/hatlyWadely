import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/Operators";
import { ModalService } from "../services/modal.service";

@Injectable({
  providedIn: "root",
})
export class DeactivateGuard implements CanDeactivate<any> {
  conf: boolean;

  constructor(private _modal: ModalService, private _router: Router) {}
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // formState initially === false
    if (!component.formState) {
      return true;
    }
    return false

  }
}
