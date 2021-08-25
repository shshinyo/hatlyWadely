import { animate, state, style, transition, trigger } from "@angular/animations";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  tap,
  throttleTime,
} from "rxjs/Operators";

enum VisibilityState {
  Visible = "visible",
  Hidden = "hidden",
}

enum Direction {
  Up = "Up",
  Down = "Down",
}

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  animations: [
    trigger("toggle", [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: "translateY(-100%)" })
      ),
      state(VisibilityState.Visible, style({ opacity: 1, transform: "translateY(0)" })),
      transition("* => *", animate("200ms ease-in")),
    ]),
  ],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  private isVisible = true;
  navToggle = false;

  @Output() sidenavToggle = new EventEmitter();
  sideOpen = true;
  links = [
    {
      location: "/welcome",
      outletName: "null",
      name: "الرئيـــــسية",
      icon: "home",
      disabled: false,
    },
    {
      location: "/shop",
      outletName: "null",
      name: "السوق",
      icon: "storefront",
      disabled: false,
    },
    {
      location: "/offers",
      outletName: "null",
      name: "العروض",
      icon: "chrome_reader_mode",
      disabled: false,
    },
    {
      location: "/contacts",
      outletName: "null",
      name: "الاتصال",
      icon: "phone",
      disabled: false,
    },
    {
      location: "/staff",
      outletName: "null",
      name: "عنــــــا",
      icon: "sports_handball",
      disabled: true,
    },
  ];


  constructor(private router: Router) {}
  ngOnInit(): void {}

  @HostBinding("@toggle")
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, "scroll").pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(filter((direction) => direction === Direction.Up));

    const scrollDown = scroll$.pipe(filter((direction) => direction === Direction.Down));

    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown.subscribe(() => (this.isVisible = false));
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
    this.sideOpen = !this.sideOpen;
  }

  logOut(): void {
    // this._authService.logOut();
    this.router.navigateByUrl("/shop");
  }
}
