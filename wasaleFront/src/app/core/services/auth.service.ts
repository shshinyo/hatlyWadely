import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { newUser } from "src/app/shared/utilities/authUser";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  currentUser: newUser;
  redirectUrl;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  get isLoggedIn(): boolean {
    return !!window.localStorage.getItem("user");
    // return !!this.currentUser;
  }
  constructor(private router: Router,private http:HttpClient, private toastr: ToastrService) {}

  login(body) {
    return this.http.post(`${environment.api_url_ip}api/users/login`,body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')

    })
  }
  register(body) {
    return this.http.post(`${environment.api_url_ip}api/users/newUser`,body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')

    })
  }
  logOut(): void {
    this.currentUser = null;
    window.localStorage.removeItem("user");
  }
}

export const localUsers: newUser[] = [
  {
    id: 1,
    name: "mohamed eldeeb",
    phone: "01098799837",
    location: "كوم حمادة",
    email: "mohamed.eldeib5@gmail.com",
    password: "hamo222",
    role: 1,
  },
  {
    id: 2,
    name: "mohamed ",
    phone: "01098799837",
    location: "كوم حمادة",
    email: "mohamed.eldeeb@gmail.com",
    password: "hamo012",
    role: 0,
  },
  {
    id: 3,
    name: "soso mostafa karem",
    phone: "01098799837",
    location: "كوم حمادة",
    email: "moahmned.eldeiib@gmail.com",
    password: "hamo012548",
    role: 0,
  },
];
