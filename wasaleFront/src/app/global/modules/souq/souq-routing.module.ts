import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDataComponent } from './card-data/card-data.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
   { path: ':category', component: CategoriesListComponent },
   { path: ':card/:id', component: CardDataComponent },
   { path: ':selectedCategory/:productType/:productName' , component:  DetailsComponent} ,
   { path: ':selectedCategory/:productType/:productName/:cartId' , component:  CardInfoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SouqRoutingModule { }
