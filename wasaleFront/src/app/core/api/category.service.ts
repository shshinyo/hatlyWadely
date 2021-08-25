import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/Operators";
import { Category } from "src/app/shared/utilities/interfaces.interface";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private _url = `${environment.api_url}api/categories`;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private _http: HttpClient) {}

  // getting all categories ( declarative abroach )
  getAllCategories$ = this._http
    .get<Category>(this._url)
    .pipe(catchError(this._handleError));

  // posting new category
  addCategory(category: Category): Observable<Category> {
    return this._http
      .post<Category>(`${this._url}/add`, category, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  // editing an category
  eidtCategory(id: string, category: Category): Observable<Category> {
    return this._http
      .put<Category>(`${this._url}/edit/${id}`, category, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  // deleting an category
  deleteCategory(id: string): Observable<Category> {
    return this._http
      .delete<Category>(`${this._url}/delete/${id}`)
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
