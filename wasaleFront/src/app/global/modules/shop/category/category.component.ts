import { ConstantPool } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, zip } from "rxjs";
import { filter, find, map, mergeMap, tap } from "rxjs/Operators";
import { ProductService } from "src/app/core/api/product.service";
import { ProductsService } from "src/app/core/services/products.service";
import { Product } from "src/app/shared/utilities/interfaces.interface";

@Component({
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  responsiveOptions: any[] = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  // get category
  ourCategory$ = this._route.paramMap.pipe(
    mergeMap((param) => {
      return this._productService
        .getCategoryProducts(param.get("categoryId"))
        .pipe(map((x) => x.data));
    })
  );

  categoryId$ = this._route.paramMap.pipe(map((param) => param.get("categoryId")));

  // Reactive abroach
  allCategories$ = this._shopService.getAllCategories$;
  category$ = zip(this.categoryId$, this.allCategories$).pipe(
    map(([categoryId, allCategories]) =>
      allCategories.categories.find((cat) => cat.id == categoryId)
    )
  );

  mainSection: [];
  secondSections: [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _shopService: ProductsService
  ) {}

  ngOnInit(): void {
    // this.category$.pipe(map((cat) => cat.sections)).subscribe((data) => {
    //   const mainSection = data.filter((sec) => sec.mainSections);
    //   const secondSections = data.filter((secSection) => secSection.secondSection);
    //   this.mainSection = mainSection;
    //   this.secondSections = secondSections;
    // });
  }

  productsFilter(): void {
    this._router.navigateByUrl("productFilter");
  }
}
