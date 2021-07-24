import { find } from "rxjs/Operators";
import { ActivatedRoute } from "@angular/router";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SouqService } from "src/app/shared/services/shop-service.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, AfterViewInit{
  cart;
  @ViewChild('totalPrice') totalPrice : ElementRef
  constructor(private souqSer: SouqService, private route: ActivatedRoute) {}
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.cart = this.souqSer.cart;
  }
  togglePrice(element , item) {
    if(item.viewValue == 1) {
      this.totalPrice.nativeElement.innerHTML = 'جنيه ' + element.price
    }
    else if (item.viewValue == 2) {
      this.totalPrice.nativeElement.innerHTML = 'جنيه ' + element.price * 2
    }  else if (item.viewValue == 3) {
      this.totalPrice.nativeElement.innerHTML = 'جنيه ' + element.price * 3
    }
  }
}
