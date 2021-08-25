import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/Operators";

import { environment } from "src/environments/environment";
import { User } from "../../global/modules/shop/auth/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _base_url = `${environment.api_url}api/users`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(private _http: HttpClient) {}

  //register method
  register(newUser: User) {
    return this._http
      .post(`${this._base_url}/newUser`, newUser, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  // login method
  login(user: User) {
    return this._http
      .post(`${this._base_url}/login`, user, this.httpOptions)
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
