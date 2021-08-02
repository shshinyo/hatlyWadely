import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CartComponent } from "./cart.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [{ path: "info", component: CartComponent }];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CartModule {}
