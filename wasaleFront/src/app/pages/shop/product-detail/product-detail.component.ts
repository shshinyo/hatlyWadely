import { filter, map, find, tap } from "rxjs/Operators";
import { SouqService } from "./../../../shared/services/shop-service.service";
import { ProductsService } from "./../../../shared/services/products.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { zip } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  // Reactive abroach
  productId$ = this._route.paramMap.pipe(map((param) => param.get("productId")));


  myArray: [];
  options: [];
  myInfoArr: [];
  offersArr: [];
  blur = false;
  showDiv = false;
  constructor(
    private _route: ActivatedRoute,
    private souqSer: SouqService,
    private _shopService: ProductsService
  ) {}
  product = {
    "detail" : "rice hatly wadely 5 kg" ,
    "price" : "45" ,
    "imgUrl" : "assets/images/images/p1.jpg",
    "rating" : "4.5"
  }

  ngOnInit(): void {
    // this.productId$.subscribe(console.log);
     this.souqSer.getAllCategories().subscribe((res) => {
    //   this.product = res.categories
    //     .find((product) => product.id == this.myMainId)
    //     .sections.find((product) => product.id == this.myCateg)
    //     .secondSection.find((elem) => elem.id == this.myThirdId);
    //   this.offersArr = res.offers;
      this.options = res.options;
    //   console.log("haha", this.product);
    });
  }
  pushInSelect(myOption) {
    this.myArray = myOption.city;
    this.myInfoArr = myOption.info;
    this.blur = true;
    this.showDiv = true;
  }
  onBlur() {
    this.blur = false;
  }
}
