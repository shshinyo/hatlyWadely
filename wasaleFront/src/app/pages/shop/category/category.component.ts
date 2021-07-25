import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { debounceTime, filter, find, map, mergeMap, tap } from "rxjs/Operators";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  categoryId$ = this._route.params.pipe(find((param) => param["categoryId"]));
  category$ = combineLatest([this.categoryId$, this._shopService.getAllCategories$]).pipe(
    map(([categoryId, allCategories]) =>
      allCategories.categories.find((cat) => cat.id == categoryId.categoryId)
    ),
    tap((x) => console.log(x))
  );

  constructor(private _route: ActivatedRoute, private _shopService: ProductsService) {}

  ngOnInit(): void {}
}
