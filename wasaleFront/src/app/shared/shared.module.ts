import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ToastrModule } from "ngx-toastr";
import { AngularSvgIconModule } from "angular-svg-icon";
import { TranslateModule } from "@ngx-translate/core";

import { MaterialModule } from "./material.module";
import { HighchartsChartModule } from "highcharts-angular";
import { CardComponent } from "./widget/card/card.component";
import { PieComponent } from "./widget/pie/pie.component";
import { HttpClientModule } from "@angular/common/http";
import { PrimeNgModule } from "./primeng.module";
import { ConfirmDialogComponent } from "./components/confirm-dialog.component";
import { SocialMediaFloatingComponent } from "./components/social-media-floating.component";
import { FooterComponent } from "../global/Grid/footer/footer.component";
import { ItemComponent } from "./components/item/item.component";
import { ItemName } from "./pipes/item-name.pipe";
import { StarComponent } from "./star/star.component";

const LOCAL_COMPONENTS = [];
const SHARED_COMPONENTS = [
  FooterComponent,
  ConfirmDialogComponent,
  CardComponent,
  PieComponent,
  ItemName,
  SocialMediaFloatingComponent,
  ItemComponent,
  StarComponent
];

const LOCAL_DIRECTIVES = [];

const SHARED_DIRECTIVES = [];

const THIRD_MODULES = [
  MaterialModule,
  PrimeNgModule,
  FlexLayoutModule,
  HighchartsChartModule,
  TranslateModule,
  ToastrModule.forRoot({
    timeOut: 4000,
    positionClass: "toast-top-left",
    preventDuplicates: true,
  }),
  AngularSvgIconModule.forRoot(),
];

const COMMON_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...LOCAL_COMPONENTS,
    ...LOCAL_DIRECTIVES,
    ...SHARED_DIRECTIVES,
  ],
  imports: [...COMMON_MODULES, ...THIRD_MODULES],
  exports: [
    ...SHARED_COMPONENTS,
    ...COMMON_MODULES,
    ...THIRD_MODULES,
    ...SHARED_DIRECTIVES,
  ],
})
export class SharedModule {}
