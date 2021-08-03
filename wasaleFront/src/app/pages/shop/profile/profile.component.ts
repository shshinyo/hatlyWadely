import { Component, OnInit } from "@angular/core";

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
      router: "",
      icon: "favorite_border",
    },
    {
      title: "التفاصيل",
      router: "",
      icon: "info",
    },
    {
      title: "جهات الاتصال",
      router: "",
      icon: "contact_mail",
    },
    {
      title: "تغير كلمة المرور",
      router: "",
      icon: "security",
    },
  ];
}
