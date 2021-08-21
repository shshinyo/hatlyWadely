import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/Operators";
import { Product } from "src/app/shared/utilities/interfaces.interface";

import { Environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private _url = `${Environment.api_url}api/products`;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private _http: HttpClient) {}

  // post product api
  addProduct(product: Product): Observable<Product> {
    return this._http
      .post<Product>(`${this._url}/add`, product, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  // get product api
  getProduct(id: string): Observable<Product> {
    return this._http
      .get<Product>(`${this._url}/product/${id}`)
      .pipe(catchError(this._handleError));
  }

  // edit product api
  editProduct(id: string, product: Product): Observable<Product> {
    return this._http
      .put<Product>(`${this._url}/edit/${id}`, product, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  // delete product api
  deleteProduct(id: string): Observable<Product> {
    return this._http.delete<Product>(`${this._url}/delete/${id}`).pipe(
      tap((product) => console.log("Product", product)),
      catchError(this._handleError)
    );
  }

  // specializes to category api
  getCategoryProducts(id: string): Observable<{ state: number; data: Product[] }> {
    return this._http
      .get<any>(`${Environment.api_url}api/products/category/${id}`)
      .pipe(catchError(this._handleError));
  }

  private _handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
