import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/Operators";
import { ProductsService } from "src/app/core/services/products.service";
import { Category } from "src/app/shared/utilities/shop.interfaces";
import { IdentityManager } from "../../modules/shop/auth/identity-manager.service";
import { User } from "../../modules/shop/auth/models/user";
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
  categories: Category[];

  user: User;
  isAuthenticated: boolean = false;

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

  constructor(
    private router: Router,
    private readonly _identityManager: IdentityManager,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._productsService.getAllCategories$.subscribe((res) => {
      this.categories = res.categories;
    });

    this._identityManager.user$
      .pipe(tap((user) => (this.isAuthenticated = !!user)))
      .subscribe({
        next: (user) => (this.user = user),
      });
  }

  onSidenavClose() {
    this.SidenavClose.emit();
  }

  logInOut(): void {
    if (this.isAuthenticated) {
      this._identityManager.signOut();
      this.router.navigateByUrl("/shop");
    } else {
      this.router.navigateByUrl("/shop/login");
    }
    this.SidenavClose.emit();
  }
}
