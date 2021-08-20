import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeactivateGuard } from "src/app/core/guards/deactivate.guard";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { MainComponent } from "./main.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { FilterComponent } from "./filter/filter.component";
import { Error404 } from "src/app/shared/components/Error404/error404.component";
import { ProfileComponent } from "./profile/profile.component";
import { OverviewComponent } from "./profile/overview/overview.component";
import { OrdersComponent } from "./profile/orders/orders.component";
import { SavedComponent } from "./profile/saved/saved.component";
import { DetailsComponent } from "./profile/details/details.component";
import { AddressComponent } from "./profile/address/address.component";
import { ResetPassComponent } from "./profile/reset-pass/reset-pass.component";
import { MyProductsComponent } from "./profile/my-products/my-products.component";
import { ShopInfoComponent } from "./products/shop-info/shop-info.component";
import { CartComponent } from "./cart/cart.component";

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
        path: "profile",
        component: ProfileComponent,
        children: [
          {
            path: "my-products",
            component: MyProductsComponent,
            // canDeactivate: [DeactivateGuard],
          },
          {
            path: "orders",
            component: OrdersComponent,
          },
          {
            path: "saved-orders",
            component: SavedComponent,
          },
          {
            path: "details",
            component: DetailsComponent,
          },
          {
            path: "address",
            component: AddressComponent,
          },
          {
            path: "change-pass",
            component: ResetPassComponent,
          },
          {
            path: "",
            component: OverviewComponent,
            pathMatch: "full",
          },
        ],
      },
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "notfound",
        component: Error404,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
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
export class ShopRoutingModule {
  static components = [
    MainComponent,
    ProductsComponent,
    ProductDetailComponent,
    CategoryComponent,
    ShopInfoComponent,
    FilterComponent,
    ProfileComponent,
    OverviewComponent,
    OrdersComponent,
    SavedComponent,
    DetailsComponent,
    AddressComponent,
    ResetPassComponent,
    MyProductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
  ];
}
