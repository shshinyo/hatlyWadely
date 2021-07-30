import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CategoriesListComponent } from './categories-list/categories-list.component';
import { DetailsComponent } from './details/details.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { CardDataComponent } from './card-data/card-data.component';
import { SouqRoutingModule } from './souq-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CategoriesListComponent,
    DetailsComponent,
    CardInfoComponent,
    CardDataComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    SouqRoutingModule,
  ],
  providers : []
})
export class SouqModule { }
