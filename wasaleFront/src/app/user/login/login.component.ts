import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControlName,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { fromEvent, Observable, merge } from "rxjs";
import { debounceTime } from "rxjs/Operators";
import { GenericValidator } from "src/app/shared/utilities/genericValidator";
import { AuthService, localUsers } from "../../core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  hide2 = true;
  errorMessage$ = this.authService.errorMessage$;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm: FormGroup;
  registerForm: FormGroup;

  // Use with the generic validation message class
  displayErrorMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this._login();
    this._registration();
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: "من فضلك ادخل الاسم",
      },
      phone: {
        required: "من فضلك ادخل رقم الهاتف المحمول",
        pattern: "لابد من البد بالارقام الاتية 010 ،012 ،015 ،011 ويكون مكون من 11 رقم",
      },
      location: {
        required: "ادخل محل السكن",
      },
      email: {
        required: "البريد الالكتروني مطلوب",
        email: "ادخل بريد صالح(لابد من ان يحتوي عليexample.com@)",
      },
      passwordGroup: {
        match: "كلمة السر غير متطابقة !",
      },
      password: {
        required: "ادخل كلمة السر",
        manlength: "يجب ان لا تقل كلمة السر عن 8 حروف او ارقام.",
      },
      confirmPassword: {
        required: "اعادة تعين كلمة السر مطلوب",
      },
      type: {
        required: "يجب اختيار نوع من المعروض امامك",
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.registerForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.displayErrorMessage = this.genericValidator.processMessages(
          this.registerForm
        );
      });
  }

  login(authForm): void {
    if (authForm && authForm.valid) {
      this.authService.login(authForm.value.email, authForm.value.password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      }
      // else {
      //   this.router.navigateByUrl("/welcome");
      // }
    }
  }

  registration(registerForm) {
    console.log(registerForm);
    // post form here
  }

  passwordMatcher = (control: AbstractControl) => {
    const pass = control.get("password");
    const confirmPass = control.get("confirmPassword");
    if (pass.pristine || confirmPass.pristine) {
      return null;
    }
    if (confirmPass.value === "") {
      return null;
    }
    if (pass.value === confirmPass.value) {
      return null;
    }
    return confirmPass.setErrors({ match: true }), { match: true };
  };

  // login Email message
  get emailError(): string {
    const email = this.loginForm.get("email");
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
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  private _registration(): void {
    const patternNumberOnly = /^01[0125][0-9]{8}$/;

    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern(patternNumberOnly)]],
      location: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: ["", [Validators.required, Validators.minLength(8)]],
          confirmPassword: ["", [Validators.required]],
        },
        { validator: this.passwordMatcher }
      ),
      type: ["", [Validators.required]],
    });
  }
}
