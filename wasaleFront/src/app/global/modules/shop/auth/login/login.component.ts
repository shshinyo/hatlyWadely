import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalService } from "src/app/core/services/modal.service";

import { IdentityManager } from "../identity-manager.service";
import { User } from "../models/user";

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
    private readonly _identityManager: IdentityManager,
    private _modal: ModalService
  ) {
    this._login();
  }

  ngOnInit(): void {}

  signIn(form: FormGroup): void {
    if (!form) {
      return;
    }
    const command: User = {
      email: form.value.email,
      password: form.value.password,
    };

    this._identityManager.signIn(command).subscribe({
      next: (user: User) => {
        this._modal.snackbar("تم تسجيل الدخول بنجاح");
        window.history.back();
      },
    });
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
      rememberMe: [""],
    });
  }
}
