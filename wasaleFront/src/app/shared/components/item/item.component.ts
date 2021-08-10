import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Product } from "../../utilities/shop.interfaces";

@Component({
  selector: "item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit, OnChanges {
  @Input() item: Product;
  _item: Product;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this._item = this.item;
  }
  saleCount(): number {
    const price = this.item.price,
      afterDiscount = this.item.afterDiscount;
    const sale = ((price - afterDiscount) / price) * 100 + 0.5;
    return Math.round(sale);
  }
}
