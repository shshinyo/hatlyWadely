import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { OffersComponent } from "./offers/offers.component";
import { OurServiceComponent } from "./our-service/our-service.component";
import { SoonComponent } from "./soon/soon.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full",
  },
  {
    path: "welcome",
    component: WelcomePageComponent,
  },
  {
    path: "offers",
    component: OffersComponent,
  },

  {
    path: "soon",
    component: SoonComponent,
  },
  {
    path: "ourService",
    component: OurServiceComponent,
  },
  {
    path: "contacts",
    children: [
      {
        path: "",
        component: ContactsComponent,
      },
      {
        path: "prices",
        component: ContactsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticsRoutingModule {}
