import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShopRoutingModule } from "./shop-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { MainComponent } from "./main.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CategoryComponent } from "./category/category.component";
import { ShopInfoComponent } from "./products/shop-info/shop-info.component";
import { FilterComponent } from "./filter/filter.component";
import { ProfileComponent } from './profile/profile.component';
import { OverviewComponent } from './profile/overview/overview.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { SavedComponent } from './profile/saved/saved.component';
import { DetailsComponent } from './profile/details/details.component';

@NgModule({
  declarations: [
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
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
