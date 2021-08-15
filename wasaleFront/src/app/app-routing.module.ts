import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminGuard } from "./core/Guards/admin.guard";
import { Error404 } from "./shared/components/Error404/error404.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./global/global.module").then((m) => m.GlobalModule),
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
