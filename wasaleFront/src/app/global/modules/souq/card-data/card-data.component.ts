import { Router } from '@angular/router';
import { find } from 'rxjs/Operators';
import { ActivatedRoute } from '@angular/router';
import { SouqService } from '../../../shared/services/shop-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {
myProduct
options
product
myArray : []
myInfoArr : []
blur = false
showDiv = false



  constructor(private souqSer : SouqService , private route : ActivatedRoute , private router : Router) { }

  ngOnInit(): void {
    this.souqSer.getAllCategories().subscribe(res=>{
      this.options = res.options
    })
     let myCardId = this.route.snapshot.params['id']
     let myCardId2 = this.route.snapshot.params['id']
     this.souqSer.getAllCategories().subscribe(res=>{
       this.myProduct = res.cards.find(elem=>elem.id == myCardId) || res.secondCards.find(elem=> elem).cardProducts.find(elem=>elem.id == myCardId2)
     })
  }
  addToCart(myProduct) {
    this.souqSer.cart.push(myProduct)
    this.router.navigate(['cart/info'])
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
