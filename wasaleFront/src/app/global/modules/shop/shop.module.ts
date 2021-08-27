import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopRoutingModule } from "./shop-routing.module";

import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ShopRoutingModule.components],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
