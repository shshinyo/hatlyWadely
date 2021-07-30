import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { zip } from "rxjs";
import { map } from "rxjs/Operators";
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

  // Reactive abroach
  categoryId$ = this._route.paramMap.pipe(map((param) => param.get("categoryId")));
  allCategories$ = this._shopService.getAllCategories$;
  category$ = zip(this.categoryId$, this.allCategories$).pipe(
    map(([categoryId, allCategories]) =>
      allCategories.categories.find((cat) => cat.id == categoryId)
    )
  );



  mainSection: [];
  secondSections: [];
  constructor(private _route: ActivatedRoute, private _shopService: ProductsService) {}

  ngOnInit(): void {
    this.category$.pipe(map((cat) => cat.sections)).subscribe((data) => {
      const mainSection = data.filter((sec) => sec.mainSections);
      const secondSections = data.filter((secSection) => secSection.secondSection);
      this.mainSection = mainSection;
      this.secondSections = secondSections;
    });
  }
}
