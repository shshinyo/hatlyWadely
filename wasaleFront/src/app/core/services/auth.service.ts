import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { newUser } from "src/app/shared/utilities/authUser";

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
  constructor(private router: Router, private toastr: ToastrService) {}

  login(email: string, password: string) {
    const user = localUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      this.currentUser = {
        id: user.id,
        role: user.role,
        name: user.name,
        phone: user.phone,
        location: user.location,
        email: user.email,
        password: user.password,
      };
      // store the user in localStorage
      window.localStorage.setItem("user", JSON.stringify(user));
      if (this.isLoggedIn) {
        if (user.role === 1) {
          console.log("admin");
          this.router.navigateByUrl("/dashboard");
        } else {
          this.router.navigateByUrl("/welcome");
          console.log("not admin");
        }
      }
      this.toastr.success("تم تسجيل الدخول بنجاح");
      this.errorMessageSubject.next("");
      // console.log(this.isLoggedIn);
      console.log(this.currentUser);
    } else {
      this.currentUser = null;
      this.errorMessageSubject.next("البريد الذي ادخلته او كلمة المرور غير صحيحة.");
      this.toastr.error("حدث خطأ اثناء التسجيل.");
    }
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
