import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardDataComponent } from "../souq/card-data/card-data.component";
import { CategoryComponent } from "./category/category.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
<<<<<<< Updated upstream
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "categoryId",
    component: CategoryComponent,
  },
  // {
  //   path:":categoryId/:categoryType",
  //   component:CategoryComponent
  // }
  // {
  //   path:":categoryId/:categoryTypeId/:productId",
  //   component:CategoryComponent
  // }
=======
  // {
  //   path: "",
  //   component: ProductsComponent
  // },
  // need to change and edit
  { path: ':item/:id', component: CardDataComponent },

>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
