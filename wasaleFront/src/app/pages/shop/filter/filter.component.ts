import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/Operators";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  filterId$ = this._route.paramMap.pipe(map((param) => param.get("productFilter")));
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {}
}
