import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StaticsRoutingModule } from "./statics-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [StaticsRoutingModule.components],
  imports: [CommonModule, StaticsRoutingModule, SharedModule],
})
export class StaticsModule {}
