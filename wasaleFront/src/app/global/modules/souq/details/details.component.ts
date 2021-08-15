import { map, find, findIndex } from 'rxjs/Operators';
import { Router } from '@angular/router';
import { filter } from 'rxjs/Operators';
import { SouqService } from '../../../shared/services/shop-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
products : any
makeItIncrease
_listFilter : string = ''
filteredProducts : any
selectedCategory
get listFilter(): string {
  return this._listFilter;
}
set listFilter(value: string) {
  this._listFilter = value;
  this.filteredProducts = this.listFilter ? this.FilterMethod(this.listFilter) : this.products;
}

FilterMethod(listFilter) {
  listFilter = listFilter.toLocaleLowerCase();
  return this.products.filter((product: any) =>
    product.detail.toLocaleLowerCase().indexOf(listFilter) !== -1);

}
  constructor(private souqSer : SouqService , private route : ActivatedRoute , private router : Router) {
    this.souqSer.selectedCategoryObserve.subscribe(res=>this.selectedCategory = res)
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['productType']
    this.selectedCategory = this.route.snapshot.params['selectedCategory']
    let myId =  this.route.snapshot.params['productName']
    let myLastId = this.route.snapshot.params['cartId']

    console.log(id , myId , this.selectedCategory)
    this.souqSer.getAllCategories().subscribe(res=>{
      this.products = res.categories.find(elem=>elem.id == this.selectedCategory).myProducts.find(elem=>elem.id == id).myProductss.find(elem=>elem.id == myId).details
      console.log('ggggg',this.products)
      this.filteredProducts = this.products;
    })
  }
  myCartArr
  cartPlus(myProduct) {
    this.router.navigate(['cart/info'])
   this.souqSer.myCartArrayBehaviour.next(myProduct)
   this.souqSer.cart.push(myProduct)
  }

}
