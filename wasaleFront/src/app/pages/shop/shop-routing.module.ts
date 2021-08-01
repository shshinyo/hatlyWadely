import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { FilterComponent } from "./filter/filter.component";

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
        path: "category/:categoryId",
        component: CategoryComponent,
      },
      {
        path: "search/:productFilter",
        component: FilterComponent,
      },
      {
        path: ":productId",
        component: ProductDetailComponent,
      },
    ],
  },
  /*
   {
    path:":categoryId/:categoryTypeId/:productId",
    component:ProductDetailComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
