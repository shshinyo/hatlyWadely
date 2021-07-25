import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _router:Router,private translateService: TranslateService) {
    this.translateService.setDefaultLang("en");
    const lang = localStorage.getItem("lang") || "en";
    this.translateService.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {
    // this._router.events.subscribe((event)=>{
    //   if (!(event instanceof NavigationEnd )){
    //     return;
    //   }
    //   window.scroll(0 ,0);
    // })
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
