import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { User } from "./models/user";

export const AUTHORED_USER = "access_user";

export interface authored_user {
  message?: string;
  status?: number;
  user?: User;
}

/**
 * Service that allows you to manage authentication token - get, set,
 * clear and also listen to token changes over time.
 */
@Injectable()
export class AuthTokenService {
  private _token$: BehaviorSubject<any> = new BehaviorSubject(null);
  private _user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private readonly _storage: LocalStorageService) {
    this._publishStoredToken();
  }

  /** Token observable it publish when token changes. */
  get token$(): Observable<any | null> {
    return this._token$;
  }

  /** Returns the current token from localStorage */
  get token(): any | null {
    const val: authored_user = this._storage.get(AUTHORED_USER);
    // const val = storage.user.accessToken;
    return !!val ? val : null;
  }

  /** Sets token to storage */
  set(user: any): void {
    this._storage.set(AUTHORED_USER, user);
    this._publishStoredToken();
  }

  /** Removes the token and published token value */
  clear(): void {
    this._storage.remove(AUTHORED_USER);
    this._publishStoredToken();
  }

  get user$(): Observable<any | null> {
    return this._user$;
  }

  get user(): any | null {
    const storage: authored_user = this._storage.get(AUTHORED_USER);
    const val = !!storage ? storage.user : null;
    return val;
  }

  private _publishStoredToken(): void {
    const token = !!this.token ? this.token.user.accessToken : null;
    const user = this.user;
    this._token$.next(token);
    this._user$.next(user);
  }
}
