import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Observable, Subscription } from "rxjs";
import { debounceTime, filter, find, map, mergeMap, tap } from "rxjs/Operators";
import { ProductsService } from "src/app/shared/services/products.service";

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
  categoryId$ = this._route.params.pipe(find((param) => param["categoryId"]));
  category$ = combineLatest([this.categoryId$, this._shopService.getAllCategories$]).pipe(
    map(([categoryId, allCategories]) =>
      allCategories.categories.find((cat) => cat.id == categoryId.categoryId)
    ),
    tap((x) => console.log(x))
  );

  mainSection;

  constructor(private _route: ActivatedRoute, private _shopService: ProductsService) {}

  ngOnInit(): void {
    this.category$.pipe(map((cat) => cat.sections)).subscribe((data) => {
      const section = data.filter((sec) => sec.mainSections);
      this.mainSection = section;
    });
  }
}
