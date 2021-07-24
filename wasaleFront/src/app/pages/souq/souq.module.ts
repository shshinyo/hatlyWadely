import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CategoriesListComponent } from './categories-list/categories-list.component';
import { DetailsComponent } from './details/details.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { StarComponent } from './star/star.component';
import { CardDataComponent } from './card-data/card-data.component';
import { SouqRoutingModule } from './souq-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductsListComponent,
    CategoriesListComponent,
    DetailsComponent,
    CardInfoComponent,
    StarComponent,
    CardDataComponent,
    ShopInfoComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    SouqRoutingModule,
  ],
  providers : []
})
export class SouqModule { }
