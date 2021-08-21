import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { WebSocketService } from "./core/services/web-socket.service";

@Component({
  selector: "app-root",
  template: `
    <ng-progress></ng-progress>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _router: Router, private translateService: TranslateService ,private webSocketService :WebSocketService) {
    this.translateService.setDefaultLang("en");
    const lang = localStorage.getItem("lang") || "en";
    this.translateService.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {
    this.webSocketService.connect();
  }

  ngOnDestroy(): void {}

  // //preload Three-dots
  ngAfterViewInit(): void {
    this._hidePreloader();
  }

  private _hidePreloader(): void {
    const el = document.getElementById("globalLoader");
    if (el) {
      el.addEventListener("transitionend", () => {
        el.style.display = "none";
      });

      if (!el.className.includes("global-loader-hidden")) {
        el.style.display = "none";
      }
    }
  }
}
