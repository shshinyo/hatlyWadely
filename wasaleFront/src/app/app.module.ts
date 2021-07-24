import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { UserModule } from "./user/user.module";
import { GlobalModule } from "./global/global.module";
import { Dashboard404 } from "./Error404/dashboard.component";
import { SouqModule } from "./pages/souq/souq.module";
import { CartModule } from "./pages/souq/cart/cart.module";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, Dashboard404],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    DashboardModule,
    UserModule,
    GlobalModule,
    // SouqModule,
    ShopModule,
    CartModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
