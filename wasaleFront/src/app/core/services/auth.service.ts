import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/Operators";

import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _url = `${environment.api_url}api/users`;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  currentUser;
  redirectUrl;

  errorMessageSubject = new Subject<string>();

  get isLoggedIn(): boolean {
    return !!window.localStorage.getItem("user");
  }
  constructor(private _http: HttpClient) {}

  login(user) {
    return this._http
      .post(`${this._url}/login`, user, this.httpOptions)
      .pipe(catchError(this._handleError));
  }
  register(newUser) {
    return this._http
      .post(`${this._url}/newUser`, newUser, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  logOut(): void {
    this.currentUser = null;
    window.localStorage.removeItem("user");
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
