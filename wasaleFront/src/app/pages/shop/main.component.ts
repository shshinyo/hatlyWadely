import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenavContent } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/Operators";
import { ProductsService } from "src/app/shared/services/products.service";

import { QueryParams } from "src/app/shared/utilities/query-params";

@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  @ViewChild("content", { static: true }) content: MatSidenavContent;
  subscription: Subscription;
  search: string | null = null;
  categories: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllCategories$.subscribe((res) => {
      this.categories = res.categories;
    });
    this.subscription = this._router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => this.content.scrollTo({ top: 0 }));

  }

  onSearch(value: string): void {
    this._router.navigate([], {
      queryParams: {
        [QueryParams.Search]: value || null,
      },
      queryParamsHandling: "merge",
    });
  }
}
