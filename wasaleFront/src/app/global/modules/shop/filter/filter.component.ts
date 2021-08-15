import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/Operators";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})


export class FilterComponent implements OnInit {
  hideCard : boolean
  menuButton = [
    {"name" : "وصل حديثا"},
    {"name" : "السعر:الاقل الي الاعلي"},
    {"name" : "السعر:الاعلي الي الاقل"}
  ]

  rateCheck = [
    {"rate" : "5"},
    {"rate" : "4" },
    {"rate" : "3" },
    {"rate" : "2" },
    {"rate" : "1" }
  ]

  rateCheck2 = [
    {"rate" : "80% أو اكثر" },
    {"rate" : "60% أو اكثر" },
    {"rate" : "40% أو اكثر" },
    {"rate" : "20% أو اكثر" }

  ]

  cards =  [
    {"imgUrl" : "assets/images/images/31.jpg" , "details" : "Alsuhagy ارز - 5 كجم" , "price" : " 22 جنيه" , "rate" : "2.4"},
    {"imgUrl" : "assets/images/images/32.jpg" , "details" : "Nabtah أرز بني - 700جم" , "price" : " 20 جنيه" , "rate" : "3"},
    {"imgUrl" : "assets/images/images/33.jpg" , "details" : "Alsuhagy ارز - 1 كجم" , "price" : " 18 جنيه" , "rate" : "3.5"},
    {"imgUrl" : "assets/images/images/34.jpg" , "details" : "Alsuhagy ارز - 2 كجم" , "price" : " 23 جنيه" , "rate" : "4"},
    {"imgUrl" : "assets/images/images/35.jpg" , "details" : "Elmatbakh أرز -5كجم" , "price" : " 24 جنيه" , "rate" : "1.8"},
    {"imgUrl" : "assets/images/images/36.jpg" , "details" : "rehana ارز - 5 كجم" , "price" : " 17 جنيه" , "rate" : "3.8"},
    {"imgUrl" : "assets/images/images/37.jpg" , "details" : "Alsuhagy ارز - 5 كجم" , "price" : "21 جنيه" , "rate" : "2.9"},


  ]
  filterId$ = this._route.paramMap.pipe(map((param) => param.get("productFilter")));
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {}
  isVisibleOnDesktop() {
    return this.hideCard == false
  }
}
