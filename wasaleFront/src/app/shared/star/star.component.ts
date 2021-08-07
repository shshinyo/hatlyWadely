import { Input } from "@angular/core";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-star",
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <div id="crop" [style.width.px]="cropWidth" fxLayoutAlign="center center">
        <div
          style="width: 75px;"
          id="myStarDiv"
          fxLayoutAlign="center center"
        >
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
      </div>
    </div>
  `,
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
