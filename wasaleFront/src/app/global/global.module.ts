import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { GlobalRoutingModule } from "./global-routing.module";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { StaticsModule } from "./modules/static/statics.module";

@NgModule({
  declarations: [GlobalRoutingModule.components],
  imports: [
    CommonModule,
    GlobalRoutingModule,
    SharedModule,
    StaticsModule,
    DragDropModule,
  ],
})
export class GlobalModule {}
