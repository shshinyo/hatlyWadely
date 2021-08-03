import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "./main.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { FilterComponent } from "./filter/filter.component";
import { Error404 } from "src/app/shared/components/Error404/error404.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: ProductsComponent,
        pathMatch: "full",
      },
      {
        path: "notfound",
        component: Error404,
      },
      {
        path: "search/:productFilter",
        component: FilterComponent,
      },
      {
        path: ":categoryId",
        component: CategoryComponent,
      },
      {
        path: ":categoryId/:productId",
        component: ProductDetailComponent,
      },
      // {
      //   path: "user",

      // },
      {
        path: "**",
        redirectTo: "notfound",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
