import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { ProductsService } from "src/app/core/services/products.service";

import { QueryParams } from "src/app/shared/utilities/query-params";

import { SideToggleService } from "../../layout/side-toggle.service";

@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  search: string | null = null;
  categories: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private productsService: ProductsService,
    private _sideToggleService: SideToggleService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllCategories$.subscribe((res) => {
      this.categories = res.categories;
    });
  }

  onSearch(value: string): void {
    this._router.navigate([], {
      queryParams: {
        [QueryParams.Search]: value || null,
      },
      queryParamsHandling: "merge",
    });
  }

  logOut(): void {
    this._authService.logOut();
  }

  onToggle(): void {
    this._sideToggleService.onToggle(true);
  }
}
