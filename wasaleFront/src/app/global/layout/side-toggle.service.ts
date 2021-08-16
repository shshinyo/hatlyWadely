import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SideToggleService   {
  sideNavToggleSubject = new Subject<boolean>();

  constructor() {}

  onToggle(val?): void {
    this.sideNavToggleSubject.next(val);
  }
}
