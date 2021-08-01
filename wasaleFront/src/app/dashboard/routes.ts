import { Routes } from "@angular/router";
import { Error404 } from "../shared/components/Error404/error404.component";
import { DefaultComponent } from "./default/default.component";
import { LayoutComponent } from "./layoutContainer.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: DefaultComponent,
      },
      {
        path: "notfound",
        component: Error404,
      },
      {
        path: "**",
        redirectTo: "notfound",
      },
    ],
  },
];
