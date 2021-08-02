import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { routes } from "./routes";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { OffersComponent } from "./offers/offers.component";
import { SoonComponent } from "./soon/soon.component";
import { OurServiceComponent } from "./our-service/our-service.component";
import { ContactsComponent } from "./contacts/contacts.component";

@NgModule({
  declarations: [
    WelcomePageComponent,
    OffersComponent,
    SoonComponent,
    OurServiceComponent,
    ContactsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, DragDropModule],
  providers: [],
})
export class PagesModule {}
