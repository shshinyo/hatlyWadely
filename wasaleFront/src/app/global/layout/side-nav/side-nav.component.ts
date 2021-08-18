import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { newUser } from "src/app/shared/utilities/authUser";
import { AuthService } from "src/app/core/services/auth.service";
export interface Tap {
  title: string;
  router: string;
  icon: string;
}

@Component({
  selector: "side-nav",
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
  get userName(): string {
    if (this.authService.isLoggedIn) {
      const user = window.localStorage.getItem("user");
      const name: newUser = JSON.parse(user);
      return name.name;
    }
    return "";
  }

  profileTaps: Array<Tap> = [
    {
      title: "حسابي",
      router: "/shop/profile",
      icon: "person_outline",
    },
    {
      title: "منتجاتي",
      router: "/shop/profile/my-products",
      icon: "category",
    },
    {
      title: "الطلبات",
      router: "/shop/profile/orders",
      icon: "inventory_2",
    },
    {
      title: "المنتجات المحفوظة",
      router: "/shop/profile/saved-orders",
      icon: "favorite_border",
    },
    {
      title: "التفاصيل",
      router: "/shop/profile/details",
      icon: "contact_support",
    },
    {
      title: "جهات الاتصال",
      router: "/shop/profile/address",
      icon: "contact_mail",
    },
    {
      title: "تغير كلمة المرور",
      router: "/shop/profile/change-pass",
      icon: "security",
    },
  ];

  categoryLinks = [
    {
      title: "الطلبات",
      router: "/shop/profile/orders",
      icon: "inventory_2",
    },
    {
      title: "المنتجات المحفوظة",
      router: "/shop/profile/saved-orders",
      icon: "favorite_border",
    },
    {
      title: "التفاصيل",
      router: "/shop/profile/details",
      icon: "contact_support",
    },
    {
      title: "جهات الاتصال",
      router: "/shop/profile/address",
      icon: "contact_mail",
    },
  ];

  staticLinks = [
    {
      title: "الرئيسية",
      router: "/welcome",
      icon: "home",
    },
    {
      title: "العروض",
      router: "/offers",
      icon: "chrome_reader_mode",
    },
    {
      title: "خدمتنا",
      router: "/ourService",
      icon: "departure_board",
    },
    {
      title: "الاتصال",
      router: "/contacts",
      icon: "phone",
    },
    {
      title: "الاسعار",
      router: "/contacts/prices",
      icon: "receipt_long",
    },
    {
      title: "الدعم الفني",
      router: "/soon",
      icon: "headset_mic",
    },
    {
      title: "عنــــــا",
      router: "/welcome",
      icon: "sports_handball",
    },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSidenavClose() {
    this.SidenavClose.emit();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl("/shop");
    this.SidenavClose.emit();
  }
}
