import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/Operators";

import { SideToggleService } from "./side-toggle.service";

@Component({
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;
  sideToggle: boolean = false;
  // // After routing to to Top 0
  @ViewChild("content", { static: true }) content: MatSidenavContent;
  subscription: Subscription;
  // lazyLoading Animation
  loading = false;

  screenMin = false;
  winWidth;

  constructor(private _router: Router, private _sideToggleService: SideToggleService) {}

  ngOnInit(): void {
    this.getSreenSize();
    // Scroll to Top when router finished
    this.subscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.content.scrollTo({ top: 0 }));

    // lazyLoading Router
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.loading = true;
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationError ||
        e instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });

    this._sideToggleService.sideNavToggleSubject.subscribe((x) => {
      if (x) {
        this.sidenav.toggle();
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  getSreenSize(event?) {
    this.winWidth = window.innerWidth;
    this.winWidth <= 1000 ? (this.screenMin = true) : (this.screenMin = false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.hidePreloader();
  }


  private hidePreloader(): void {
    const el = document.getElementById("globalLoader");
    if (el) {
      el.addEventListener("transitionend", () => {
        setTimeout(() => {
          el.className = "global-loader-hidden";
        }, 200);
      });

      if (!el.className.includes("global-loader-hidden")) {
        el.className += " global-loader-fade-in";
      }
    }
  }
}
