import { HostListener, NgModule, OnInit } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layout/layout.component";
import { Error404 } from "../shared/components/Error404/error404.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/shop",
        pathMatch: "full",
      },
      {
        path: "",
        loadChildren: () =>
          import("./modules/static/statics.module").then((m) => m.StaticsModule),
      },
      {
        path: "shop",
        data: { preload: false },
        loadChildren: () =>
          import("./modules/shop/shop.module").then((m) => m.ShopModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./modules/souq/cart/cart.module").then((m) => m.CartModule),
      },

      {
        path: "notfound",
        component: Error404,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalRoutingModule {}
