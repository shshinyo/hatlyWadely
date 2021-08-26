import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShopRoutingModule } from "./shop-routing.module";

import { SharedModule } from "src/app/shared/shared.module";
import { DashModalComponent } from './dash-board/dash-modal.component';

@NgModule({
  declarations: [ShopRoutingModule.components, DashModalComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
