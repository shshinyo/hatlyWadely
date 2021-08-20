import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/utilities/interfaces.interface";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
