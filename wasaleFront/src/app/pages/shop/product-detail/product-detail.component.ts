import { filter, map , find } from 'rxjs/Operators';
import { SouqService } from './../../../shared/services/shop-service.service';
import { ProductsService } from './../../../shared/services/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product
  myArray : []
  options : []
    myInfoArr : []
    offersArr : []
    blur = false
    showDiv = false;
  constructor(private route : ActivatedRoute , private souqSer : SouqService ) {
    console.log(this.myThirdId)
    console.log(this.myMainId)
    console.log(this.myCateg)

  }
   myThirdId = this.route.snapshot.params['categoryType']
   myMainId = this.route.snapshot.params['categoryName']
   myCateg = this.route.snapshot.params['categ']



  ngOnInit(): void {
      this.souqSer.getAllCategories().subscribe(res=>{
        this.product = res.categories.find(product=>product.id == this.myMainId).sections.find(product=>product.id == this.myCateg).secondSection.find(elem=>elem.id == this.myThirdId)

        this.offersArr = res.offers
        this.options = res.options
        console.log('haha',this.product)
      })
  }
  pushInSelect(myOption) {
    this.myArray = myOption.city
    this.myInfoArr = myOption.info
    this.blur = true
    this.showDiv = true

  }
  onBlur () {
    this.blur = false
  }

}
