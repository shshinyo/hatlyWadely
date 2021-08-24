import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/Operators";
import { User } from "src/app/shared/utilities/interfaces.interface";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _url = `${environment.api_url}api/users`;
  private readonly AUTH_TOKEN = "user_token";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  currentUser;

  get isLoggedIn(): boolean {
    return !!window.localStorage.getItem(this.AUTH_TOKEN);
  }

  constructor(private _http: HttpClient) {}

  register(newUser: User) {
    return this._http
      .post(`${this._url}/newUser`, newUser, this.httpOptions)
      .pipe(catchError(this._handleError));
  }

  login(user: User) {
    return this._http.post(`${this._url}/login`, user).pipe(
      map((response: any) => {
        if (response.result.succeeded) {
          localStorage.setItem(this.AUTH_TOKEN, response.token);
        }
      }),
      catchError(this._handleError)
    );
  }

  logOut(): void {
    this.currentUser = null;
    window.localStorage.removeItem(this.AUTH_TOKEN);
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
