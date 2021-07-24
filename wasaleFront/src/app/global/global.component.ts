import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenavContent } from "@angular/material/sidenav";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/Operators";

@Component({
  selector: "app-global",
  templateUrl: "./global.component.html",
  styleUrls: ["./global.component.scss"],
})
export class GlobalComponent implements OnInit {
  // // After routing to to Top 0
  @ViewChild("content", { static: true }) content: MatSidenavContent;
  subscription: Subscription;
  // lazyLoading Animation
  loading = false;

  screenMin = false;
  winWidth;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getSreenSize();
    // Scroll to Top when router finished
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.content.scrollTo({ top: 0 }));

    // lazyLoading Router
    this.router.events.subscribe((e) => {
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
  }

  @HostListener("window:resize", ["$event"])
  getSreenSize(event?) {
    this.winWidth = window.innerWidth;
    this.winWidth <= 1000 ? (this.screenMin = true) : (this.screenMin = false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // dashboardControl(): boolean {
  //   const url = window.location.href;
  //   if (url.includes("/dashboard")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // //preload Three-dots
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
