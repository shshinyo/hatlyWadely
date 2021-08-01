import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { QueryParams } from "src/app/shared/utilities/query-params";

@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  search: string | null = null;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSearch(value: string): void {
    this._router.navigate([], {
      queryParams: {
        [QueryParams.Search]: value || null,
      },
      queryParamsHandling: "merge",
    });
  }
}
