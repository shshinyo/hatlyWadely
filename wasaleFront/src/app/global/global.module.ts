import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { GlobalRoutingModule } from "./global-routing.module";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { LayoutComponent } from "./layout/layout.component";
import { StaticsModule } from "./modules/static/statics.module";
import { SideNavComponent } from "./layout/side-nav/side-nav.component";
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";

const LAY_OUT = [LayoutComponent, ToolbarComponent, SideNavComponent];

@NgModule({
  declarations: [...LAY_OUT],
  imports: [
    CommonModule,
    GlobalRoutingModule,

    SharedModule,
    StaticsModule,
    DragDropModule,
  ],
})
export class GlobalModule {}
