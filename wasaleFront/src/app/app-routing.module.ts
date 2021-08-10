import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GlobalComponent } from "./global/global.component";
import { AdminGuard } from "./core/Guards/admin.guard";
import { Error404 } from "./shared/components/Error404/error404.component";

const routes: Routes = [
  {
    path: "",
    component: GlobalComponent,
    children: [
      {
        path: "",
        redirectTo: "",
        pathMatch: "full",
      },
      {
        path: "",
        loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
      },
      {
        path: "shop",
        data: { preload: false },
        loadChildren: () => import("./pages/shop/shop.module").then((m) => m.ShopModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./pages/souq/cart/cart.module").then((m) => m.CartModule),
      },
      
      {
        path: "notfound",
        component: Error404,
      },
    ],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AdminGuard],
  },
  {
    path: "notfound",
    component: Error404,
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "notfound",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
