import { Component, OnInit } from "@angular/core";
import { fade } from "src/app/shared/animations/fade";

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

  constructor() {}

  ngOnInit(): void {
    this.lang = document.documentElement.lang;
  }
  profileTaps: Array<Tap> = [
    {
      title: "حسابي",
      router: "/shop/profile",
      icon: "person_outline",
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
      icon: "info",
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
}
