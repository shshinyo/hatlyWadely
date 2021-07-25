import { Component, Input, OnInit } from "@angular/core";

export interface Product {
  id: string;
  imgUrl?: string;
  detail?: string;
  price?: number;
  afterDiscount?: number;
}
@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
  @Input() item: Product;
  constructor() {}

  ngOnInit(): void {}

  saleCount(): number {
    const price = this.item.price,
      afterDiscount = this.item.afterDiscount;
    const sale = (price - afterDiscount) / price;
    return sale;
  }
}
