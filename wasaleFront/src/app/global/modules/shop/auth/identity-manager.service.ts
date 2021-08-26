import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthTokenService } from "./auth-token.service";
import { AuthService } from "../../../../core/api/auth-api.service";
import { User } from "./models/user";

/** Common authentication & authorization service. */
@Injectable({
  providedIn: "root",
})
export class IdentityManager {
  constructor(
    private readonly _tokenSrv: AuthTokenService,
    private _authService: AuthService
  ) {}

  /** Get changes in user$ token */
  get user$(): Observable<User | null> {
    return this._tokenSrv.user$;
  }

  get user(): User | null {
    return this._tokenSrv.user;
  }

  /** Returns authentication status stream */
  get isAuthenticated$(): Observable<boolean> {
    return this._tokenSrv.token$.pipe(map((token) => !!token?.isValid));
  }

  /** Returns current authentication status */
  get isAuthenticated(): boolean {
    return !!this._tokenSrv.token;
  }

  /** Refresh current user token if it valid. */
  // public refreshToken(): Observable<User | null> {
  //   if (!this.isAuthenticated) {
  //     return of(null);
  //   }
  //   return this._processToken(this._identityClient.refreshToken());
  // }

  public register(req: any): Observable<any> {
    return this._authService.register(req);
  }

  public signIn(req: any): Observable<any> {
    return this._authService.login(req).pipe(
      map((response: any) => {
        if (response) {
          this._tokenSrv.set(response);
        }
      })
    );
  }

  public signOut(): void {
    this._tokenSrv.clear();
  }
}
