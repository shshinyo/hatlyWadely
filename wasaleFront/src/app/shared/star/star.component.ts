import { Input } from "@angular/core";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating = 0;
  cropWidth = 75;
  constructor() {}
  ngOnChanges() {
    this.cropWidth = this.rating * (75 / 4.1);
  }

  ngOnInit(): void {}
}
