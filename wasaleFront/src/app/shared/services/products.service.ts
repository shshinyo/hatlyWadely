import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataJson, Offer } from "../utilities/shop.interfaces";

import  {environment}  from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {

  env = environment.api_url
  private readonly url = "../../assets/images/images/data.json";
  data = [
    { imgUrl: "../../assets/images/images/dd1.jpg" },
    { imgUrl: "../../assets/images/images/dd2.jpg" },
    { imgUrl: "../../assets/images/images/dd3.jpg" },
    { imgUrl: "../../assets/images/images/dd4.jpg" },
    { imgUrl: "../../assets/images/images/dd2.jpg" },
  ];
  getAllCategories$: Observable<DataJson> = this.http.get<DataJson>(this.url);
  // for test
  Offers$: Observable<Offer[]> = of(this.data);
  constructor(private http: HttpClient) {}
}

