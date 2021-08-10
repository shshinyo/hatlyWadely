import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "../shared/shared.module";

import { GlobalComponent } from "./global.component";
import { ToolbarComponent } from "./Grid/toolbar/toolbar.component";
import { SideNavComponent } from "./Grid/side-nav/side-nav.component";
import { SymbolNamePipe } from "../shared/pipes/symbol-name.pipe";
import { CasedNamePipe } from "../shared/pipes/cased-name.pipe";
import { GlobalRoutingModule } from "./global-routing.module";

@NgModule({
  declarations: [
    GlobalComponent,
    ToolbarComponent,
    SideNavComponent,
    SymbolNamePipe,
    CasedNamePipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalRoutingModule,
  ],
})
export class GlobalModule {}
