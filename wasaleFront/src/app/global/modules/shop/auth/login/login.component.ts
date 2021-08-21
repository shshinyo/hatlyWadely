import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

import { Const } from "src/app/shared/utilities/const";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hidePass = true;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this._login();
  }

  ngOnInit(): void {}
  login(form): void {
    console.log(form);
    this._authService.login(JSON.stringify({email:form.email,password:form.password})).subscribe(res=>{
      console.log(res)
    })
  }

  get emailError(): string {
    const email = this.form.get("email");
    if (!email) {
      return "";
    }
    return email.hasError("required")
      ? "ادخل البريد الالكتروني"
      : email.hasError("email")
      ? "ادخل بريد صالح(لابد من ان يحتوي عليexample.com@)"
      : "حدث خطأ اثناء التسجيل...تأكد من انك مسجل بالفعل";
  }

  private _login(): void {
    this.form = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [],
    });
  }
}
