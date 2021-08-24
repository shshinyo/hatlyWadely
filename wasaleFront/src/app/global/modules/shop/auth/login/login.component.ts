import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { ModalService } from "src/app/core/services/modal.service";

import { Const } from "src/app/shared/utilities/const";
import { User } from "src/app/shared/utilities/interfaces.interface";

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
    private _authService: AuthService,
    private _modal: ModalService
  ) {
    this._login();
  }

  ngOnInit(): void {}

  login(form: FormGroup): void {
    if (!form) {
      return;
    }
    const command: User = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log("🚀 ~ file: login.component.ts ~ line 35 ~ LoginComponent ~ login ~ command", command)
    this._authService.login(command).subscribe({
      next: () => {
        this._modal.snackbar("تم تسجيل الدخول بنجاح", "success");
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
