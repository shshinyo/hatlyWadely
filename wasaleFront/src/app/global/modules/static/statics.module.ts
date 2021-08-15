import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StaticsRoutingModule } from "./statics-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { OffersComponent } from "./offers/offers.component";
import { OurServiceComponent } from "./our-service/our-service.component";
import { SoonComponent } from "./soon/soon.component";

@NgModule({
  declarations: [
    WelcomePageComponent,
    OffersComponent,
    SoonComponent,
    OurServiceComponent,
    ContactsComponent,
  ],
  imports: [CommonModule, StaticsRoutingModule, SharedModule,],
})
export class StaticsModule {}
