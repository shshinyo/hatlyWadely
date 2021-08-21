import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User } from "../../shared/utilities/interfaces.interface";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private getUsersUrl = `${environment.api_url}api/users/getUsers`;

  getUsers$ = this.http.get<User[]>(this.getUsersUrl);
  // getUsers$() {
  //   return this.http.get<User[]>(`${environment.api_url}api/users/getUsers`);
  // }

  createUser(user) {
    return this.http.post<User>(`${environment.api_url}api/users/newUser`, user);
  }
}
