import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/Operators";
import { ProductsService } from "src/app/core/services/products.service";

import { QueryParams } from "src/app/shared/utilities/query-params";
import { Category } from "src/app/shared/utilities/shop.interfaces";

import { SideToggleService } from "../../layout/side-toggle.service";
import { IdentityManager } from "./auth/identity-manager.service";
import { User } from "./auth/models/user";

@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  user: User;
  isAuthenticated: boolean = false;

  search: string | null = null;
  categories: Category[];

  constructor(
    private _router: Router,
    private _productsService: ProductsService,
    private _sideToggleService: SideToggleService,
    private readonly _identityManager: IdentityManager
  ) {}

  ngOnInit(): void {
    this._productsService.getAllCategories$.subscribe((res) => {
      this.categories = res.categories;
    });

    this._identityManager.user$
      .pipe(tap((user) => (this.isAuthenticated = !!user)))
      .subscribe({
        next: (user) => (this.user = user),
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
    this._identityManager.signOut();
    this._router.navigateByUrl("/shop");
  }

  onToggle(): void {
    this._sideToggleService.onToggle(true);
  }
}
