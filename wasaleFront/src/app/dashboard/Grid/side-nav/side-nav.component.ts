import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { newUser } from "src/app/shared/utilities/authUser";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "side-dash",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  @Output() SidenavClose = new EventEmitter();
  // user is logged in
  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  // get user name for avatar
  get user(): newUser {
    if (this.authService.isLoggedIn) {
      const user = window.localStorage.getItem("user");
      const x = JSON.parse(user);
      return x;
    }
    return;
  }

  links = [
    {
      disc: "home",
      icon: "home",
      location: "/dashboard",
    },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSidenavClose() {
    this.SidenavClose.emit();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl("/welcome");
    this.SidenavClose.emit();
  }
}
