import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fade } from "src/app/shared/animations/fade";
import { Paths } from "src/app/shared/utilities/const";

export interface Tap {
  title: string;
  router: string;
  icon: string;
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  lang: any;
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
    {
      title: "لوحه التحكم",
      router: "/shop/profile/dash",
      icon: "settings",
    },
  ];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.lang = document.documentElement.lang;
  }
  // Implement logout here
  logOut(): void {
    this._router.navigateByUrl(Paths.shop);
  }
}
