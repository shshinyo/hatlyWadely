import { find } from 'rxjs/Operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SouqService } from '../../../shared/services/shop-service.service';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  product
selectedCategory
myArray : []
options : []
  myInfoArr : []
  offersArr : []
  blur = false
  showDiv = false
    constructor(private souqSer : SouqService , private route : ActivatedRoute , private router : Router) {
    }

  ngOnInit(): void {
    this.souqSer.getAllCategories().subscribe(res=>{
      this.options = res.options
    })
    this.souqSer.selectedCategoryObserve.subscribe(res=>this.selectedCategory = res)
    this.selectedCategory = this.route.snapshot.params['selectedCategory']
    let id = this.route.snapshot.params['productType']
    let myId =  this.route.snapshot.params['productName']
    let myLastId = this.route.snapshot.params['cartId']

    this.souqSer.getAllCategories().subscribe(res=>{
      this.product = res.categories.find(elem=>elem.id == this.selectedCategory).myProducts.find(elem=>elem.id == id).myProductss.find(elem=>elem.id == myId).details.find(elem=>elem.id == myLastId)
      console.log('haha',this.product)
    })
    this.souqSer.getAllCategories().subscribe(res=>{
      this.offersArr = res.offers
      console.log('heyyyy',this.offersArr)
    })
  }
  pushInSelect(myOption) {
    console.log(myOption)
    this.myArray = myOption.city
    this.myInfoArr = myOption.info
    this.blur = true
    this.showDiv = true

  }
  onBlur () {
    this.blur = false
  }
  navigateFunc () {
    this.router.navigateByUrl('hatlyWadely-shop/groceries/gross/pasta')
    }

}
